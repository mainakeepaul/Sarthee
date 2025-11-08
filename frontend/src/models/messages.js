// // // src/models/Message.js
// // import mongoose from "mongoose";

// // const MessageSchema = new mongoose.Schema(
// //   {
// //     chat: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "Chat",
// //       required: true,
// //     },
// //     sender: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       ref: "User",
// //       required: true,
// //     },
// //     text: {
// //       type: String,
// //       trim: true,
// //     },
// //     attachments: [
// //       {
// //         url: String,
// //         mimeType: String,
// //       },
// //     ],
// //   },
// //   { timestamps: true }
// // );

// // export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
// import mongoose from "mongoose";

// const MessageSchema = new mongoose.Schema(
//   {
//     chat: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Chat",
//       required: true,
//     },
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     // optional: reactions, readBy, attachments...
//   },
//   { timestamps: true }
// );

// export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);
export default Message;
