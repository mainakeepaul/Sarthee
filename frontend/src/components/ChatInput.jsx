// 'use client';
// import { useState, useRef, useEffect } from 'react';

// export default function ChatInput({ onSendMessage, disabled = false }) {
//   const [message, setMessage] = useState('');
//   const textareaRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !disabled) {
//       onSendMessage(message.trim());
//       setMessage('');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [message]);

//   return (
//     <div className="border-t bg-white p-4">
//       <form onSubmit={handleSubmit} className="flex space-x-4">
//         <div className="flex-1">
//           <textarea
//             ref={textareaRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your message..."
//             disabled={disabled}
//             rows={1}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={!message.trim() || disabled}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }

// ============================================================================

// 'use client';
// import { useState, useRef, useEffect } from 'react';

// export default function ChatInput({ onSendMessage, disabled = false }) {
//   const [message, setMessage] = useState('');
//   const textareaRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message.trim() && !disabled) {
//       onSendMessage(message.trim());
//       setMessage('');
//     }
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = 'auto';
//       textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
//     }
//   }, [message]);

//   return (
//     <div className="border-t bg-white p-4">
//       <form onSubmit={handleSubmit} className="flex space-x-4">
//         <div className="flex-1">
//           <textarea
//             ref={textareaRef}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Type your message..."
//             disabled={disabled}
//             rows={1}
//             className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
//           />
//         </div>
//         <button
//           type="submit"
//           disabled={!message.trim() || disabled}
//           className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// }


'use client';
import { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';

export default function ChatInput({ onSendMessage, disabled = false }) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        {/* Input Field */}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message... (Press Enter to send)"
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-3 pr-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-purple-200 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          />
          
          {/* Action Buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            {/* Attachment Button */}
            <button
              type="button"
              disabled={disabled}
              className="p-2 text-purple-300 hover:text-purple-200 hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            
            {/* Voice Button */}
            <button
              type="button"
              disabled={disabled}
              className="p-2 text-purple-300 hover:text-purple-200 hover:bg-white/10 rounded-lg transition-all duration-200 disabled:opacity-50"
            >
              <Mic className="w-4 h-4" />
            </button>
            
            {/* Send Button */}
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className="p-2 bg-gradient-to-r from-purple-700 to-blue-700 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
      
      {/* Character Count */}
      {message.length > 0 && (
        <div className="absolute -bottom-6 right-0 text-xs text-purple-300">
          {message.length}/1000
        </div>
      )}
    </div>
  );
}