import { NextResponse } from "next/server";
// import connectdB from "@/helper/db";
import Chat from "@/models/ChatMessage";
import Message from "@/models/messages";
import connectdb from "@/helper/db";
import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/connectDB";
// import Chat from "@/models/chatModel";
// import Message from "@/models/messageModel";
/*
 * @route   GET /api/chat/[chatId]/messages
 * @desc    Fetch all messages for a specific chat
 */
// export async function GET(req, { params }) {
//   const { chatid } = params;

//   try {
//     await connectdb();

//     // verify the chat exists
//     const chat = await Chat.findById(chatid);
//     if (!chat) {
//       return NextResponse.json({ error: "Chat not found" }, { status: 404 });
//     }

//     // fetch messages sorted by creation time
//     const messages = await Message.find({ chatid }).sort({ createdAt: 1 });

//     return NextResponse.json(messages, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/chat/[chatid]/messages error:", err);
//     return NextResponse.json(
//       { error: "Failed to fetch messages", message: err.message },
//       { status: 500 }
//     );
//   }
// }

/*
 * @route   POST /api/chat/[chatId]/messages
 * @desc    Add a new message to a chat
 */
// export async function POST(req, { params }) {
//   const { chatid } = params;

//   try {
//     await connectdb();
//     const body = await req.json();
//     const { sender, text } = body;

//     if (!text || !sender) {
//       return NextResponse.json(
//         { error: "Missing required fields: sender or text" },
//         { status: 400 }
//       );
//     }

//     // ensure chat exists
//     const chat = await Chat.findById(chatid);
//     if (!chat) {
//       return NextResponse.json({ error: "Chat not found" }, { status: 404 });
//     }

//     // create message
//     const message = await Message.create({ chatid, sender, text });

//     // update chat's last message
//     chat.lastMessage = message._id;
//     chat.updatedAt = new Date();
//     await chat.save();

//     return NextResponse.json(message, { status: 201 });
//   } catch (err) {
//     console.error("POST /api/chat/[chatid]/messages error:", err);
//     return NextResponse.json(
//       { error: "Failed to send message", message: err.message },
//       { status: 500 }
//     );


//   }
// }

// src/app/api/chat/[chatid]/messages/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Message from "@/models/Message";
// import Chat from "@/models/chat";

/**
 * GET /api/chat/[chatid]/messages?before=<ISO date or messageId>&limit=20
 * Returns messages for a chat, newest-first (you can reverse on client).
 */
// export async function GET(req, { params }) {
//   try {
//     await connectDB();

//     const { chatid } = params;
//     if (!chatid) {
//       return NextResponse.json({ error: "chatid is required" }, { status: 400 });
//     }

//     const url = new URL(req.url);
//     const before = url.searchParams.get("before"); // optional cursor (ISO date or msg id)
//     const limit = parseInt(url.searchParams.get("limit") || "50", 10);

//     // validate that chat exists (optional but helpful)
//     const chatExists = await Chat.findById(chatid).lean();
//     if (!chatExists) {
//       return NextResponse.json({ error: "Chat not found" }, { status: 404 });
//     }

//     const query = { chat: chatid };

//     // If `before` is an ISO date, use createdAt < before; otherwise fallback to _id < before
//     if (before) {
//       const time = Date.parse(before);
//       if (!isNaN(time)) {
//         query.createdAt = { $lt: new Date(time) };
//       } else {
//         // treat as ObjectId cursor (works if you passed message._id)
//         query._id = { $lt: before };
//       }
//     }

//     const messages = await Message.find(query)
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .populate("sender", "name email") // adjust fields as needed
//       .lean();

//     return NextResponse.json({ messages }, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/chat/[chatid]/messages error:", err);
//     return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
//   }
// }



// export async function POST(req, { params }) {
//   try {
//     await connectDB();

//     const { chatid } = params;
//     if (!chatid) {
//       return NextResponse.json({ error: "chatid is required" }, { status: 400 });
//     }

//     const body = await req.json().catch(() => null);
//     if (!body) {
//       return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
//     }

//     const { senderId, content } = body;

//     if (!senderId) {
//       return NextResponse.json({ error: "senderId is required" }, { status: 400 });
//     }
//     if (!content || String(content).trim() === "") {
//       return NextResponse.json({ error: "content is required" }, { status: 400 });
//     }

//     // Validate chat existence (and ensure chatid is a valid ObjectId)
//     if (!mongoose.Types.ObjectId.isValid(chatid)) {
//       return NextResponse.json({ error: "Invalid chatid" }, { status: 400 });
//     }

//     const chatExists = await Chat.findById(chatid);
//     if (!chatExists) {
//       return NextResponse.json({ error: "Chat not found" }, { status: 404 });
//     }

//     // Optionally validate senderId too
//     if (!mongoose.Types.ObjectId.isValid(senderId)) {
//       return NextResponse.json({ error: "Invalid senderId" }, { status: 400 });
//     }

//     const newMessage = await Message.create({
//       chat: chatid,
//       sender: senderId,
//       content: String(content).trim(),
//     });

//     const populatedMsg = await newMessage.populate("sender", "name email");

//     // update chat metadata
//     chatExists.lastMessage = populatedMsg._id;
//     chatExists.updatedAt = new Date();
//     await chatExists.save();

//     return NextResponse.json({ message: populatedMsg }, { status: 201 });
//   } catch (err) {
//     console.error("POST /api/chat/[chatid]/messages error:", err);
//     return NextResponse.json({ error: "Internal Server Error", details: err.message }, { status: 500 });
//   }
// }
// import Message from "@/models/Message";
// import Chat from "@/models/Chat";
// import { connectToDB } from "@/utils/database";

export async function GET(req, { params }) {
  try {
    await connectdb();
    const { chatid } = params; // Access the dynamic route parameter

    if (!chatid) return new Response("Chat ID is required", { status: 400 });

    const messages = await Message.find({ chat: chatid })
      .sort({ createdAt: 1 })
      .populate("sender", "name email"); // populate sender info

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("GET /api/chat/[chatid]/messages error:", error);
    return new Response("Failed to fetch messages", { status: 500 });
  }
}

export async function POST(req, { params }) {
  try {
    await connectdb();
    const { chatid } = params;
    const { sender, text } = await req.json();

    if (!chatid || !sender || !text)
      return new Response("Chat ID, sender, and text required", { status: 400 });

    const newMessage = await Message.create({
      chat: chatid,
      sender,
      text,
    });

    // Update chat's updatedAt timestamp
    await Chat.findByIdAndUpdate(chatid, { updatedAt: Date.now() });

    const populatedMessage = await newMessage.populate("sender", "name email");

    return new Response(JSON.stringify(populatedMessage), { status: 201 });
  } catch (error) {
    console.error("POST /api/chat/[chatid]/messages error:", error);
    return new Response("Failed to send message", { status: 500 });
  }
}
