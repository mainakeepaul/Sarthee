// import mongoose from 'mongoose';

// const ChatMessageSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   content: { type: String, required: true },
//   isUser: { type: Boolean, required: true },
//   timestamp: { type: Date, default: Date.now },
//   sessionId: { type: String, required: true }
// });

// // Check if model already exists to prevent OverwriteModelError
// const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);

// export default ChatMessage;




// import mongoose from 'mongoose';

// const ChatMessageSchema = new mongoose.Schema({
//   userId: { 
//     type: String, 
//     required: [true, 'User ID is required'] 
//   },
//   content: { 
//     type: String, 
//     required: [true, 'Message content is required'] 
//   },
//   isUser: { 
//     type: Boolean, 
//     required: [true, 'isUser field is required'] 
//   },
//   timestamp: { 
//     type: Date, 
//     default: Date.now 
//   },
//   sessionId: { 
//     type: String, 
//     default: 'default-session' 
//   }
// }, {
//   timestamps: true // This adds createdAt and updatedAt automatically
// });

// // Prevent model overwrite in development
// const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);

// export default ChatMessage;

import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  isUser: { 
    type: Boolean, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  sessionId: { 
    type: String, 
    default: 'default-session' 
  }
});

const ChatMessage = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);

export default ChatMessage;