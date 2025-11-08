// // src/app/api/chats/[chatId]/route.js
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Chat from "@/models/Chat";
// import Message from "@/models/Message";
// import { getUserIdFromReq } from "@/lib/auth";

// export async function GET(req, { params }) {
//   await connectDB();

//   const userId = getUserIdFromReq(req);
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { chatId } = params;
//   try {
//     const chat = await Chat.findById(chatId);
//     if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

//     // ensure membership (for single-member draft you might allow the creator)
//     if (!chat.members.map(m => m.toString()).includes(userId.toString())) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const url = new URL(req.url);
//     const limit = Math.min(parseInt(url.searchParams.get("limit") || "50", 10), 200);
//     const before = url.searchParams.get("before");

//     const q = { chat: chatId };
//     if (before) q.createdAt = { $lt: new Date(before) };

//     let msgs = await Message.find(q)
//       .sort({ createdAt: -1 })
//       .limit(limit)
//       .populate("sender", "name email");

//     // return ascending (oldest -> newest)
//     msgs = msgs.reverse();

//     return NextResponse.json(msgs, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/chats/[chatId]/messages error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req, { params }) {
//   await connectDB();

//   const userId = getUserIdFromReq(req);
//   if (!userId) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { chatId } = params;

//   try {
//     const chat = await Chat.findById(chatId);
//     if (!chat) return NextResponse.json({ error: "Chat not found" }, { status: 404 });

//     if (!chat.members.map(m => m.toString()).includes(userId.toString())) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const body = await req.json();
//     const { text, attachments } = body;

//     if (!text && !(attachments && attachments.length)) {
//       return NextResponse.json({ error: "text or attachments required" }, { status: 400 });
//     }

//     const msg = await Message.create({
//       chat: chatId,
//       sender: userId,
//       text: text || "",
//       attachments: attachments || []
//     });

//     // update chat lastMessage and updatedAt
//     chat.lastMessage = msg._id;
//     await chat.save();

//     const populated = await Message.findById(msg._id).populate("sender", "name email");

//     // If you run a separate Socket server you can broadcast here via HTTP or another mechanism.
//     // This API only returns the created message.

//     return NextResponse.json(populated, { status: 201 });
//   } catch (err) {
//     console.error("POST /api/chats/[chatId]/messages error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
// src/app/api/chat/[chatid]/messages/route.js
import { NextResponse } from "next/server";
import connectDB from "@/helper/db";
import Chat from "@/models/ChatMessage";
import Message from "@/models/messages";

export async function GET(req, { params }) {
  await connectDB();
  const { chatid } = params;
  const messages = await Message.find({ chatId: chatid }).sort({ createdAt: 1 });
  return NextResponse.json(messages);
}

export async function POST(req, { params }) {
  await connectDB();
  const { chatid } = params;
  const body = await req.json();
  const { senderId, text } = body;

  const message = await Message.create({ chatId: chatid, senderId, text });
  await Chat.findByIdAndUpdate(chatid, { $push: { messages: message._id } });

  return NextResponse.json(message, { status: 201 });
}
