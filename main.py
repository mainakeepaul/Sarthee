import os
import uvicorn
from fastapi import FastAPI, HTTPException, Header, Depends
from pydantic import BaseModel
from dotenv import load_dotenv
from typing import List, Optional
from contextlib import asynccontextmanager

# --- Imports from your Notebook ---
from langchain_openai import ChatOpenAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_community.tools import DuckDuckGoSearchRun
from langchain_core.tools import Tool
from langchain_core.messages import HumanMessage, AIMessage

# --- AGENT IMPORTS FROM YOUR NOTEBOOK ---
from langchain.agents import create_agent

# --- 1. Load Environment Variables ---
load_dotenv()  # <-- loads from .env.local explicitly

# --- 2. Global Variables ---
llm = None
agent = None
retriever = None
Tools = []

# --- 3. Pydantic Models ---
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]

class ChatResponse(BaseModel):
    answer: str


# --- 4. API Key Dependency ---


# --- 5. Lifespan (Startup + Shutdown) ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("--- Server is starting up... ---")

    global llm, agent, retriever, Tools

    # Initialize OpenAI LLM
    llm = ChatOpenAI(
        model="gpt-3.5-turbo-0125",
        api_key=os.getenv("OPENAI_API_KEY"),
        temperature=0.1
    )
    print("✅ ChatOpenAI model loaded.")

    # Embeddings + Chroma
    print("Loading embedding model...")
    embedding_model = GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004",
        google_api_key=os.getenv("GOOGLE_API_KEY")
    )

    print("Connecting to Chroma DB...")
    vector_store = Chroma(
        collection_name="collections",
        embedding_function=embedding_model,
        persist_directory="./chroma_db"
    )
    retriever = vector_store.as_retriever(search_type="similarity", search_kwargs={"k": 10})
    print("✅ Retriever ready.")

    # Tools setup
    search_tool_func = DuckDuckGoSearchRun()

    def retrieve_from_pdf(query: str):
        return retriever.invoke(query)

    pdf_tool = Tool(
        name="Census_PDF_Retriever",
        func=retrieve_from_pdf,
        description="Use this tool to answer census-related questions."
    )

    def trusted_search(query: str) -> str:
        site_filter = "site:kmcgov.in OR site:wb.gov.in OR site:data.gov.in OR site:jadavpuruniversity.in"
        restricted_query = f"{query} ({site_filter})"
        print(f"[Agent Log] Running TRUSTED search: {restricted_query}")
        return search_tool_func.run(restricted_query)

    trusted_tool = Tool(
        name="Trusted_Local_Search",
        func=trusted_search,
        description="Search local trusted sites first for Kolkata/WB government info."
    )

    general_tool = Tool(
        name="General_Web_Search",
        func=search_tool_func.run,
        description="Fallback search for general or real-time info."
    )

    Tools = [pdf_tool, trusted_tool, general_tool]

    # System prompt
    prompt_string = """
    You are a helpful assistant. Understand multilingual (Benglish/Hinglish).
    You have access to these tools: {tools}

    Rules:
    1) Always use tools to answer user queries.
    2) Choose tool logically based on query.
    3) Use Census_PDF_Retriever for PDF-based questions.
    4) Use Trusted_Local_Search first for civic/local questions.
    5) Use General_Web_Search only if others fail.
    6) Cite the source of information in your reply.
    7) If no answer, reply: "I am sorry, I do not have access to that information."
    8) Translate output to match user's input language if needed.

    Format:
    Question: {input}
    Thought:{agent_scratchpad}
    """

    agent = create_agent(
        model=llm,
        tools=Tools,
        system_prompt=prompt_string
    )

    print("✅ AI Agent initialized successfully.")
    yield
    print("--- Server shutting down ---")


app = FastAPI(lifespan=lifespan)


# --- 6. Chat Endpoint (Protected) ---
@app.post("/chat", response_model=ChatResponse)
async def handle_chat(request: ChatRequest):
    if not agent:
        raise HTTPException(status_code=503, detail="Agent not initialized yet.")
    
    print(f"--- Received {len(request.messages)} messages ---")
    langchain_messages = [
        HumanMessage(content=m.content) if m.role == "user" else AIMessage(content=m.content)
        for m in request.messages
    ]

    try:
        result = await agent.ainvoke({"messages": langchain_messages})
        final_answer = result["messages"][-1].content
        print(f"✅ Sending Answer: {final_answer}")
        return ChatResponse(answer=final_answer)
    except Exception as e:
        print(f"[ERROR] {e}")
        raise HTTPException(status_code=500, detail=f"Agent error: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)