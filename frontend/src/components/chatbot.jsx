// "use client"
// import React, { useContext, useEffect, useRef, useState } from "react";
// import { logoutUSer } from "@/services/userServices";
// import UserContext  from "../context/userContext";
// import Link from "next/link";

// /**
//  * ChatBot.jsx
//  * - Tailwind CSS required
//  * - Save as ChatBot.jsx and import where needed
//  */

// export default function ChatBot() {
//   const [user, setUser] = useState(null);
//   const [chats, setChats] = useState(() => [
//     {
//       id: "c1",
//       title: "Project ideas",
//       messages: [
//         { id: 1, sender: "bot", text: "Hi — how can I help with your project?", time: "10:01" },
//         { id: 2, sender: "user", text: "Suggest a simple MVP for a campus app.", time: "10:02" },
//       ],
//     },
//     {
//       id: "c2",
//       title: "Study plan",
//       messages: [
//         { id: 3, sender: "user", text: "Help me plan DSA practice.", time: "09:20" },
//         { id: 4, sender: "bot", text: "Try 30 mins daily with variety.", time: "09:21" },
//       ],
//     },
//   ]);
//   const [activeChatId, setActiveChatId] = useState(chats[0].id);
//   const [input, setInput] = useState("");
//   const [dropdownChatId, setDropdownChatId] = useState(null);

//   // Voice recognition
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   // refs
//   const messagesEndRef = useRef(null);
//   const messagesContainerRef = useRef(null);
//   const ctx = useContext(UserContext);

//   const isLoggedIn = Boolean(ctx && ctx.user);
//   console.log(ctx)
//   console.log(ctx.user)

//   const handleLogout = async () => {
//       console.log("[Navbar] logout clicked");
//       if (ctx && typeof ctx.setUser === "function") {
//         ctx.setUser(null);
//       }
//       try {
//         const res = await logoutUSer();
//         console.log(res);
//       } catch (err) {
//         console.log(err);
//       }
//       alert("Logged out successfully!");
//     };
  
//   // Auto-scroll on messages change / active chat change
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [activeChatId, chats]);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     function handlePointerDown(e) {
//       const insideDropdown = e.target.closest?.(".chat-dropdown");
//       const isDots = e.target.closest?.(".chat-three-dots");
//       if (!insideDropdown && !isDots) {
//         setDropdownChatId(null);
//       }
//     }
//     document.addEventListener("pointerdown", handlePointerDown);
//     return () => document.removeEventListener("pointerdown", handlePointerDown);
//   }, []);

//   // Initialize SpeechRecognition if available
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       recognitionRef.current = null;
//       return;
//     }
//     const recog = new SpeechRecognition();
//     recog.lang = "en-US";
//     recog.interimResults = false;
//     recog.maxAlternatives = 1;
//     recog.onresult = (event) => {
//       const transcript = Array.from(event.results).map((r) => r[0].transcript).join("");
//       setInput((prev) => (prev ? prev + " " + transcript : transcript));
//     };
//     recog.onend = () => setIsListening(false);
//     recog.onerror = () => setIsListening(false);
//     recognitionRef.current = recog;
//   }, []);

//   function mockSignIn() {
//     setUser({ name: "Mainakee Paul", email: "mainakee@example.com" });
//   }

//   function signOut() {
//     setUser(null);
//   }

//   function openNewChat() {
//     const id = `c${Date.now()}`;
//     const newChat = { id, title: "New chat", messages: [] };
//     setChats((prev) => [newChat, ...prev]);
//     setActiveChatId(id);
//   }

//   function sendMessage() {
//     if (!input.trim()) return;
//     const now = new Date();
//     const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
//     const userMsg = { id: Date.now(), sender: "user", text: input.trim(), time };
//     setChats((prev) =>
//       prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, userMsg] } : chat))
//     );
//     setInput("");

//     // Mock bot reply
//     setTimeout(() => {
//       const botMsg = { id: Date.now() + 1, sender: "bot", text: `Echo: ${userMsg.text}`, time };
//       setChats((prev) =>
//         prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, botMsg] } : chat))
//       );
//     }, 450);
//   }

//   function deleteChat(id) {
//     setChats((prev) => prev.filter((c) => c.id !== id));
//     if (activeChatId === id && chats.length > 1) {
//       // pick next chat if any
//       const next = chats.find((c) => c.id !== id);
//       if (next) setActiveChatId(next.id);
//     }
//   }

//   function toggleListening() {
//     const recog = recognitionRef.current;
//     if (!recog) {
//       alert("Voice recognition not supported in this browser.");
//       return;
//     }
//     if (isListening) {
//       try {
//         recog.stop();
//       } catch (e) {}
//       setIsListening(false);
//     } else {
//       try {
//         recog.start();
//         setIsListening(true);
//       } catch (e) {
//         setIsListening(false);
//       }
//     }
//   }

   

//   const activeChat = chats.find((c) => c.id === activeChatId) || { messages: [], title: "No chat selected" };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f0712] to-[#120517] text-gray-100 p-6">
//       {/* hide scrollbars while keeping scroll behavior */}
//       <style>{`
//         /* hide scrollbars for WebKit */
//         .hide-scrollbar::-webkit-scrollbar { display: none; }
//         /* hide scrollbar for Firefox */
//         .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>

//       {/* NAVBAR */}
//       <nav className="flex items-center justify-between mb-6">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
//               <path d="M12 3L21 8.5L12 14L3 8.5L12 3Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//             </svg>
//           </div>
//           <h1 className="text-xl font-semibold tracking-wide">Sarthee Chat</h1>
//         </div>

//         <div className="flex items-center gap-3">
//           {!isLoggedIn ? (
//             <>
//               <button className="px-3 py-1 rounded-md bg-purple-600 hover:brightness-105 transition">
//                 <Link href="signup">
//                 Sign in
//                 </Link></button>
//               <button className="px-3 py-1 rounded-md border border-pink-500 text-pink-400">
//                 <Link href="login">
//                 Login
//                 </Link></button>
//             </>
//           ) : (
//             <div className="flex items-center gap-3">
//               {/* <span className="text-sm opacity-80">{user.name}</span> */}
//               <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-pink-600/80 hover:brightness-110 transition">Logout</button>
//             </div>
//           )}
//         </div>
//       </nav>

//       <div className="grid grid-cols-12 gap-6">
//         {/* SIDEBAR */}
//         <aside className="col-span-3 bg-gradient-to-b from-[#1b0420] to-[#150218] rounded-2xl p-4 shadow-lg h-[75vh] overflow-y-auto hide-scrollbar">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-sm font-semibold">Chats</h2>
//             <button onClick={openNewChat} className="text-xs px-2 py-1 rounded-md bg-pink-500/20 border border-pink-500">+ New</button>
//           </div>

//           <div className="space-y-2">
//             {chats.length === 0 && <div className="text-xs opacity-60">No chats yet — start a new one</div>}
//             {chats.map((chat) => (
//               <div
//                 key={chat.id}
//                 className={`relative flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/5 transition ${chat.id === activeChatId ? "bg-white/5 ring-1 ring-pink-500/30" : ""}`}
//                 onClick={() => setActiveChatId(chat.id)}
//               >
//                 <div>
//                   <div className="text-sm font-medium">{chat.title}</div>
//                   <div className="text-xs opacity-60">{chat.messages.length} messages</div>
//                 </div>

//                 {/* three-dots + dropdown */}
//                 <div className="relative">
//                   <button
//                     onClick={(e) => { e.stopPropagation(); setDropdownChatId(dropdownChatId === chat.id ? null : chat.id); }}
//                     className="chat-three-dots text-gray-400 hover:text-pink-400 text-lg px-2"
//                     aria-label="Chat actions"
//                     title="Chat actions"
//                   >
//                     ⋮
//                   </button>

//                   {dropdownChatId === chat.id && (
//                     <div className="chat-dropdown absolute right-0 top-6 w-44 bg-[#1b0420] border border-pink-500/30 rounded-md shadow-md z-50">
//                       <button
//                         onClick={(e) => { e.stopPropagation(); navigator.clipboard?.writeText(chat.messages.map((m) => m.text).join("\n") || ""); setDropdownChatId(null); }}
//                         className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10"
//                       >
//                         Copy conversation
//                       </button>

//                       <button
//                         onClick={(e) => { e.stopPropagation(); const newName = prompt("Rename chat", chat.title); if (newName) setChats((prev) => prev.map((c) => (c.id === chat.id ? { ...c, title: newName } : c))); setDropdownChatId(null); }}
//                         className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10"
//                       >
//                         Rename chat
//                       </button>

//                       <button
//                         onClick={(e) => { e.stopPropagation(); alert("Export not implemented"); setDropdownChatId(null); }}
//                         className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10"
//                       >
//                         Export conversation
//                       </button>

//                       <button
//                         onClick={(e) => { e.stopPropagation(); deleteChat(chat.id); setDropdownChatId(null); }}
//                         className="block w-full text-left text-xs px-3 py-2 text-red-400 hover:bg-red-500/10"
//                       >
//                         Delete chat
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </aside>

//         {/* MAIN CHAT AREA */}
//         <main className="col-span-9 bg-gradient-to-b from-[#0f0712] to-[#120517] rounded-2xl shadow-lg h-[87vh] flex flex-col overflow-hidden">
//           {/* header */}
//           <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f0a1a]">
//             <div>
//               <h3 className="text-lg font-semibold">{activeChat.title}</h3>
//               <p className="text-xs opacity-60">Conversation</p>
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => navigator.clipboard?.writeText(activeChat.messages.map((m) => m.text).join("\n") || "")}
//                 className="text-xs px-2 py-1 rounded-md border border-pink-500"
//               >
//                 Copy
//               </button>
//               <button
//                 onClick={() => setChats((prev) => prev.map((c) => (c.id === activeChat.id ? { ...c, messages: [] } : c)))}
//                 className="text-xs px-2 py-1 rounded-md border border-purple-600"
//               >
//                 Clear
//               </button>
//             </div>
//           </div>

//           {/* messages container (scrollable) */}
//           <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
//             {activeChat.messages.length === 0 && <div className="text-xs opacity-60">No messages — start the conversation</div>}
//             {activeChat.messages.map((m) => (
//               <div key={m.id} className={`max-w-[80%] p-3 rounded-xl ${m.sender === "user" ? "ml-auto bg-pink-600/20 text-right" : "bg-purple-700/20 text-left"}`}>
//                 <div className="text-sm">{m.text}</div>
//                 <div className="text-xs opacity-60 mt-1">{m.time}</div>
//               </div>
//             ))}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input section pinned to bottom (sticky) */}
//           <div className="sticky bottom-0 bg-gradient-to-t from-transparent to-[#0f0712] px-3 pt-2">
//             <div className="mt-1 flex gap-2 items-center pt-2 border-t border-[#2a122b] bg-[#0b0310] rounded-b-xl p-3">
//               <input
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyDown={(e) => { if (e.key === "Enter") sendMessage(); }}
//                 placeholder="Type a message..."
//                 className="flex-1 rounded-full px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none"
//               />

//               {/* mic button */}
//               <button
//                 onClick={toggleListening}
//                 className={`p-2 rounded-full border ${isListening ? "bg-pink-600/80 border-pink-400" : "bg-transparent border-[#2a122b]"} transition`}
//                 title={isListening ? "Stop listening" : "Start voice input"}
//                 aria-pressed={isListening}
//               >
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
//                   <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M19 11v1a7 7 0 0 1-14 0v-1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                   <path d="M12 21v-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </button>

//               <button onClick={sendMessage} className="px-4 py-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow">
//                 Send
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
"use client"
import React, { useContext, useEffect, useRef, useState } from "react";
import { logoutUSer } from "@/services/userServices";
import UserContext from "../context/userContext";
import Link from "next/link";
import { getChats, createOrOpenChat, getMessages, sendMessage as apiSendMessage } from "@/services/chatServices";

/**
 * ChatBot.jsx - server-backed
 */
export default function ChatBot() {
  const ctx = useContext(UserContext);
  const isLoggedIn = Boolean(ctx && ctx.user);

  const [chats, setChats] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [input, setInput] = useState("");
  const [dropdownChatId, setDropdownChatId] = useState(null);
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  // voice/speech
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // scroll refs
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // ---------------- load chats ----------------
  useEffect(() => {
    loadChats();
  }, []);

  async function loadChats() {
    setLoadingChats(true);
    try {
      const data = await getChats();
      // normalize to use _id and messages (messages empty initially)
      const normalized = (data || []).map(c => ({ ...c, messages: c.messages || [] }));
      setChats(normalized);
      if (normalized.length > 0) setActiveChatId(prev => prev ?? normalized[0]._id);
    } catch (err) {
      console.error("loadChats error", err);
    } finally {
      setLoadingChats(false);
    }
  }

  // ---------------- load messages for active chat ----------------
  useEffect(() => {
    if (!activeChatId) return;
    loadLatestMessages(activeChatId);
  }, [activeChatId]);

  async function loadLatestMessages(chatId) {
    setLoadingMessages(true);
    try {
      const msgs = await getMessages(chatId, { limit: 50 });
      setChats(prev => prev.map(c => c._id === chatId ? { ...c, messages: msgs } : c));
      setHasMore(Array.isArray(msgs) && msgs.length === 50);
      // scroll bottom shortly after messages set
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
    } catch (err) {
      console.error("loadLatestMessages", err);
    } finally {
      setLoadingMessages(false);
    }
  }

  async function loadOlder(chatId) {
    const chat = chats.find(c => c._id === chatId);
    if (!chat || !chat.messages?.length || !hasMore) return;
    const before = chat.messages[0].createdAt;
    try {
      const older = await getMessages(chatId, { limit: 50, before });
      setChats(prev => prev.map(c => c._id === chatId ? { ...c, messages: [...older, ...(c.messages || [])] } : c));
      if (!older || older.length < 50) setHasMore(false);
    } catch (err) {
      console.error("loadOlder", err);
    }
  }

  // ---------------- open/create chat ----------------
  async function openNewChat() {
    try {
      // If you have otherUserId, pass it here. For now create a draft chat via server fallback.
      const chat = await createOrOpenChat({ otherUserId: null, title: "New chat" });
      setChats(prev => {
        if (prev.find(c => c._id === chat._id)) return prev;
        return [ { ...chat, messages: chat.messages || [] }, ...prev ];
      });
      setActiveChatId(chat._id);
    } catch (err) {
      console.error("openNewChat", err);
      // fallback: local-only
      const id = `local_${Date.now()}`;
      const newChat = { _id: id, title: "New chat", messages: [] };
      setChats(prev => [newChat, ...prev]);
      setActiveChatId(id);
    }
  }

  // ---------------- send message (optimistic) ----------------
  // async function handleSendMessage() {
  //   if (!input.trim() || !activeChatId) return;
  //   const text = input.trim();
  //   const tempId = `temp_${Date.now()}`;
  //   const optimistic = {
  //     _id: tempId,
  //     sender: { _id: ctx?.user?._id || "me", name: ctx?.user?.name || "You" },
  //     text,
  //     createdAt: new Date().toISOString(),
  //     optimistic: true
  //   };

  //   // append optimistic
  //   setChats(prev => prev.map(c => c._id === activeChatId ? { ...c, messages: [...(c.messages||[]), optimistic] } : c));
  //   setInput("");

  //   try {
  //     const saved = await apiSendMessage(activeChatId, { text });
  //     // replace optimistic
  //     setChats(prev => prev.map(c => {
  //       if (c._id !== activeChatId) return c;
  //       return { ...c, messages: c.messages.map(m => m._id === tempId ? saved : m) };
  //     }));
  //   } catch (err) {
  //     console.error("send message error", err);
  //     // rollback optimistic
  //     setChats(prev => prev.map(c => c._id === activeChatId ? { ...c, messages: c.messages.filter(m => m._id !== tempId) } : c));
  //     alert("Failed to send message");
  //   } finally {
  //     setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  //   }
  // }
  // inside ChatBot component — replace your handleSendMessage() with this:

async function handleSendMessage() {
  // guard: trim and non-empty
  const textTrimmed = (input ?? "").trim();
  if (!textTrimmed || !activeChatId) return;

  // ensure we have a logged-in user id
  const senderId = ctx?.user?._id || null;
  if (!senderId) {
    console.error("No logged-in user id (ctx.user._id missing).");
    alert("Please log in to send messages.");
    return;
  }

  const tempId = `temp_${Date.now()}`;
  const optimistic = {
    _id: tempId,
    sender: { _id: senderId, name: ctx?.user?.name || "You" },
    text: textTrimmed,             // keep `text` to match your UI rendering
    createdAt: new Date().toISOString(),
    optimistic: true,
  };

  // append optimistic message to the active chat's messages
  setChats(prev => prev.map(c => c._id === activeChatId ? { ...c, messages: [...(c.messages||[]), optimistic] } : c));
  setInput("");

  try {
    // send payload matching backend expectations: senderId + content
    // note: your apiSendMessage should be wired to call the backend POST
    // if your backend expects `content` rename accordingly.
    const payload = { senderId, content: textTrimmed };

    const saved = await apiSendMessage(activeChatId, payload);

    // replace optimistic message with server-saved message
    setChats(prev => prev.map(c => {
      if (c._id !== activeChatId) return c;
      return {
        ...c,
        messages: c.messages.map(m => m._id === tempId ? (saved.message || saved) : m)
      };
    }));
  } catch (err) {
    console.error("send message error", err);
    // rollback optimistic message
    setChats(prev => prev.map(c => c._id === activeChatId ? { ...c, messages: c.messages.filter(m => m._id !== tempId) } : c));
    alert("Failed to send message");
  } finally {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 80);
  }
}


  // ---------------- delete chat (local only) ----------------
  function deleteChatLocal(id) {
    setChats(prev => prev.filter(c => c._id !== id));
    if (activeChatId === id) {
      const next = chats.find(c => c._id !== id);
      setActiveChatId(next?._id ?? null);
    }
    // optionally call server-side DELETE if you implement it
  }

  // ---------------- logout ----------------
  const handleLogout = async () => {
    if (ctx && typeof ctx.setUser === "function") ctx.setUser(null);
    try { await logoutUSer(); } catch(e){ console.warn(e); }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    alert("Logged out");
  };

  // ---------------- speech recognition (preserve your logic) ----------------
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { recognitionRef.current = null; return; }
    const recog = new SpeechRecognition();
    recog.lang = "en-US";
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.onresult = (event) => {
      const transcript = Array.from(event.results).map(r=>r[0].transcript).join("");
      setInput(prev => prev ? prev + " " + transcript : transcript);
    };
    recog.onend = () => setIsListening(false);
    recog.onerror = () => setIsListening(false);
    recognitionRef.current = recog;
  }, []);

  function toggleListening() {
    const recog = recognitionRef.current;
    if (!recog) { alert("Voice recognition not supported"); return; }
    if (isListening) { try{ recog.stop(); } catch(e){} setIsListening(false); }
    else { try{ recog.start(); setIsListening(true); } catch(e){ setIsListening(false);} }
  }

  // scroll to bottom when messages change for active chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, activeChatId]);

  // active chat object
  const activeChat = chats.find(c => c._id === activeChatId) || { messages: [], title: "No chat selected" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0712] to-[#120517] text-gray-100 p-6">
      <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>

      {/* NAVBAR */}
      <nav className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 3L21 8.5L12 14L3 8.5L12 3Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold tracking-wide">Sarthee Chat</h1>
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <>
              <button className="px-3 py-1 rounded-md bg-purple-600 hover:brightness-105 transition">
                <Link href="signup">Sign in</Link>
              </button>
              <button className="px-3 py-1 rounded-md border border-pink-500 text-pink-400">
                <Link href="login">Login</Link>
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={handleLogout} className="px-3 py-1 rounded-md bg-pink-600/80 hover:brightness-110 transition">Logout</button>
            </div>
          )}
        </div>
      </nav>

      <div className="grid grid-cols-12 gap-6">
        {/* SIDEBAR */}
        <aside className="col-span-3 bg-gradient-to-b from-[#1b0420] to-[#150218] rounded-2xl p-4 shadow-lg h-[75vh] overflow-y-auto hide-scrollbar">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Chats</h2>
            <button onClick={openNewChat} className="text-xs px-2 py-1 rounded-md bg-pink-500/20 border border-pink-500">+ New</button>
          </div>

          <div className="space-y-2">
            {loadingChats && <div className="text-xs opacity-60">Loading chats...</div>}
            {(!loadingChats && chats.length === 0) && <div className="text-xs opacity-60">No chats yet — start a new one</div>}
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`relative flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-white/5 transition ${chat._id === activeChatId ? "bg-white/5 ring-1 ring-pink-500/30" : ""}`}
                onClick={() => setActiveChatId(chat._id)}
              >
                <div>
                  <div className="text-sm font-medium">{chat.title || (chat.members?.length === 2 ? chat.members.map(m=>m.name).filter(Boolean).join(", ") : "Conversation")}</div>
                  <div className="text-xs opacity-60">{(chat.messages?.length) ?? 0} messages</div>
                </div>

                {/* three-dots */}
                <div className="relative">
                  <button onClick={(e)=>{ e.stopPropagation(); setDropdownChatId(dropdownChatId === chat._id ? null : chat._id); }} className="chat-three-dots text-gray-400 hover:text-pink-400 text-lg px-2">⋮</button>

                  {dropdownChatId === chat._id && (
                    <div className="chat-dropdown absolute right-0 top-6 w-44 bg-[#1b0420] border border-pink-500/30 rounded-md shadow-md z-50">
                      <button onClick={(e)=>{ e.stopPropagation(); navigator.clipboard?.writeText((chat.messages||[]).map(m=>m.text).join("\n")||""); setDropdownChatId(null); }} className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10">Copy conversation</button>

                      <button onClick={(e)=>{ e.stopPropagation(); const newName = prompt("Rename chat", chat.title||""); if(newName) setChats(prev=> prev.map(c=> c._id===chat._id ? {...c, title:newName} : c)); setDropdownChatId(null); }} className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10">Rename chat</button>

                      <button onClick={(e)=>{ e.stopPropagation(); alert("Export not implemented"); setDropdownChatId(null); }} className="block w-full text-left text-xs px-3 py-2 hover:bg-pink-500/10">Export conversation</button>

                      <button onClick={(e)=>{ e.stopPropagation(); deleteChatLocal(chat._id); setDropdownChatId(null); }} className="block w-full text-left text-xs px-3 py-2 text-red-400 hover:bg-red-500/10">Delete chat</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* MAIN CHAT AREA */}
        <main className="col-span-9 bg-gradient-to-b from-[#0f0712] to-[#120517] rounded-2xl shadow-lg h-[87vh] flex flex-col overflow-hidden">
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-[#1f0a1a]">
            <div>
              <h3 className="text-lg font-semibold">{activeChat.title || "Conversation"}</h3>
              <p className="text-xs opacity-60">Conversation</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={()=>navigator.clipboard?.writeText((activeChat.messages||[]).map(m=>m.text).join("\n") || "")} className="text-xs px-2 py-1 rounded-md border border-pink-500">Copy</button>
              <button onClick={()=> setChats(prev=> prev.map(c=> c._id===activeChat._id ? {...c, messages: []} : c))} className="text-xs px-2 py-1 rounded-md border border-purple-600">Clear</button>
            </div>
          </div>

          {/* messages container */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
            {loadingMessages && <div className="text-xs opacity-60">Loading messages...</div>}
            {!loadingMessages && (!activeChat.messages || activeChat.messages.length === 0) && <div className="text-xs opacity-60">No messages — start the conversation</div>}

            <div className="mb-2">{hasMore && <button onClick={()=> loadOlder(activeChat._id)} className="text-xs px-2 py-1 rounded-md border border-gray-700">Load older</button>}</div>

            {(activeChat.messages || []).map((m) => (
              <div key={m._id || m.id} className={`max-w-[80%] p-3 rounded-xl ${ (m.sender && (m.sender._id === (ctx?.user?._id || "me"))) ? "ml-auto bg-pink-600/20 text-right" : "bg-purple-700/20 text-left"}`}>
                <div className="text-sm">{m.text}</div>
                <div className="text-xs opacity-60 mt-1">{new Date(m.createdAt || m.time || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* input */}
          <div className="sticky bottom-0 bg-gradient-to-t from-transparent to-[#0f0712] px-3 pt-2">
            <div className="mt-1 flex gap-2 items-center pt-2 border-t border-[#2a122b] bg-[#0b0310] rounded-b-xl p-3">
              <input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if(e.key==="Enter") handleSendMessage(); }} placeholder="Type a message..." className="flex-1 rounded-full px-4 py-2 bg-[#08040a] border border-[#2a122b] focus:outline-none" />
              <button onClick={toggleListening} className={`p-2 rounded-full border ${isListening ? "bg-pink-600/80 border-pink-400" : "bg-transparent border-[#2a122b]"} transition`} title={isListening ? "Stop listening" : "Start voice input"} aria-pressed={isListening}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M19 11v1a7 7 0 0 1-14 0v-1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 21v-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button onClick={handleSendMessage} className="px-4 py-2 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 shadow">Send</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
