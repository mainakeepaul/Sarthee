// // src/services/chatServices.js
// import axios from "axios";

// /**
//  * Axios instance used by all service functions.
//  * Change baseURL to your backend URL when needed.
//  */
// const httpAxios = axios.create({
//   baseURL: "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// /**
//  * Helper: safely coerce various message shapes into a trimmed string
//  * Accepts: string, { text }, { content }, { message }, numbers (converted), etc.
//  * Returns: trimmed string or empty string.
//  */
// function normalizeMessageToString(message) {
//   if (message == null) return "";
//   if (typeof message === "string") return message.trim();
//   if (typeof message === "number" || typeof message === "boolean") return String(message).trim();

//   // If it's an object/array — try common fields
//   if (typeof message === "object") {
//     // prefer .text, then .content, then .message, then .body
//     const candidates = ["text", "content", "message", "body", "msg"];
//     for (const key of candidates) {
//       if (Object.prototype.hasOwnProperty.call(message, key)) {
//         const v = message[key];
//         if (v != null) return (typeof v === "string" ? v : String(v)).trim();
//       }
//     }
//     // fallback to JSON string if object has useful content
//     try {
//       const json = JSON.stringify(message);
//       if (json && json !== "{}") return json;
//     } catch (e) {
//       // ignore circular errors
//     }
//   }

//   // unknown type -> empty string
//   return "";
// }

// /**
//  * Get all chats for the logged-in user
//  * @param {string} token - JWT token (optional, but recommended)
//  * @returns {Promise<any>}
//  */
// export async function getChats(token) {
//   try {
//     const res = await httpAxios.get("/api/chat", {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     return res.data;
//   } catch (err) {
//     if (err.response) {
//       console.error("getChats failed:", {
//         status: err.response.status,
//         data: err.response.data,
//       });
//     } else {
//       console.error("getChats failed (no response):", err.message);
//     }
//     throw err;
//   }
// }

// /**
//  * Get messages for a chat
//  * @param {string} chatid
//  * @param {string} token
//  * @param {object} opts - { limit, before }
//  */
// export async function getMessages(chatid, token, opts = {}) {
//   try {
//     if (!chatid) throw new Error("getMessages: chatId is required");

//     const params = new URLSearchParams();
//     if (opts.limit) params.append("limit", String(opts.limit));
//     if (opts.before) params.append("before", opts.before);

//     const qs = params.toString() ? `?${params.toString()}` : "";

//     const res = await httpAxios.get(`/api/chat/${chatid}/messages${qs}`, {
//       headers: token ? { Authorization: `Bearer ${token}` } : {},
//     });
//     return res.data;
//   } catch (err) {
//     if (err.response) {
//       console.error("getMessages failed:", {
//         status: err.response.status,
//         data: err.response.data,
//       });
//     } else {
//       console.error("getMessages failed (no response):", err.message);
//     }
//     throw err;
//   }
// }

// /**
//  * Send a message to a chat.
//  * Accepts message as string or object (e.g. { text } / { content } / { message }).
//  *
//  * @param {string} chatid
//  * @param {string|object|number|boolean} message
//  * @param {string} token - JWT token
//  * @returns {Promise<any>}
//  */
// export async function sendMessage(chatid, message, token) {
//   if (!chatid) throw new Error("sendMessage: chatId is required");

//   const text = normalizeMessageToString(message);
//   if (!text) throw new Error("sendMessage: message text is required");

//   if (!token) throw new Error("sendMessage: token is required");

//   try {
//     const res = await httpAxios.post(
//       `/api/chat/${chatid}/messages`, // make sure this matches your backend route
//       { text },                      // payload backend expects
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return res.data;
//   } catch (err) {
//     if (err.response) {
//       console.error("sendMessage failed (backend response):", {
//         status: err.response.status,
//         data: err.response.data,
//       });
//     } else if (err.request) {
//       console.error("sendMessage failed (no response):", err.message);
//     } else {
//       console.error("sendMessage failed (other error):", err.message);
//     }
//     throw err;
//   }
// }

// /**
//  * Convenience alias that accepts either (chatId, bodyObj) or same params as sendMessage.
//  * If passed (chatId, { text: "hi" }, token) it will call sendMessage correctly.
//  */
// export async function apiSendMessage(chatid, bodyOrMessage, token) {
//   // If bodyOrMessage looks like a token (string and token param not provided),
//   // assume caller used older signature: apiSendMessage(chatId, token)
//   if (typeof bodyOrMessage === "string" && !token) {
//     // caller used apiSendMessage(chatId, token) -> no message provided
//     throw new Error("apiSendMessage: message is required");
//   }

//   // If bodyOrMessage is the message content object/string, forward to sendMessage
//   return await sendMessage(chatid, bodyOrMessage, token);
// }

// /**
//  * Create a new chat (or return existing from backend)
//  */
// export async function createChat(senderId, receiverId, token) {
//   try {
//     if (!senderId || !receiverId) throw new Error("createChat: senderId and receiverId required");
//     const res = await httpAxios.post(
//       "/api/chat",
//       { senderId, receiverId },
//       { headers: token ? { Authorization: `Bearer ${token}` } : {} }
//     );
//     return res.data;
//   } catch (err) {
//     if (err.response) {
//       console.error("createChat failed:", {
//         status: err.response.status,
//         data: err.response.data,
//       });
//     } else {
//       console.error("createChat failed (no response):", err.message);
//     }
//     throw err;
//   }
// }
import axios from "axios";

const API_URL = "/api/chat";

export const getChats = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching chats:", error);
    throw error;
  }
};

export const createOrOpenChat = async (userId) => {
  try {
    const response = await axios.post(API_URL, { userId });
    return response.data;
  } catch (error) {
    console.error("Error creating/opening chat:", error);
    throw error;
  }
};

export const getMessages = async (chatId) => {
  try {
    const response = await axios.get(`${API_URL}/${chatId}/messages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const sendMessage = async (chatId, senderId, text) => {
  try {
    const response = await axios.post(`${API_URL}/${chatId}/messages`, {
      sender: senderId,
      text,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
