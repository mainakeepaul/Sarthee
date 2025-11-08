// export default function MessageBubble({ message }) {
//   // Add safety check for undefined message
//   if (!message) {
//     return null; // or return a loading/error state
//   }

//   const isUser = message.isUser;
  
//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//       <div
//         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//           isUser
//             ? 'bg-blue-600 text-white rounded-br-none'
//             : 'bg-gray-200 text-gray-800 rounded-bl-none'
//         }`}
//       >
//         <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//         <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
//           {new Date(message.timestamp).toLocaleTimeString()}
//         </p>
//       </div>
//     </div>
//   );
// }
// ====================================================================
// export default function MessageBubble({ message }) {
//   if (!message) return null;

//   const isUser = message.isUser;
  
//   return (
//     <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
//       <div
//         className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
//           isUser
//             ? 'bg-blue-600 text-white rounded-br-none'
//             : 'bg-gray-200 text-gray-800 rounded-bl-none'
//         }`}
//       >
//         <p className="text-sm whitespace-pre-wrap">{message.content}</p>
//         <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
//           {new Date(message.timestamp).toLocaleTimeString()}
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';
import { User, Bot, CheckCircle } from 'lucide-react';

export default function MessageBubble({ message }) {
  if (!message) return null;

  const isUser = message.isUser;
  const time = new Date(message.timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex space-x-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg' 
            : 'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-white" />
          )}
        </div>

        {/* Message Content */}
        <div className={`relative ${
          isUser 
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl rounded-br-none' 
            : 'bg-white/10 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-none'
        } px-4 py-3 shadow-lg`}>
          {/* Message Text */}
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          
          {/* Timestamp and Status */}
          <div className={`flex items-center justify-between mt-2 text-xs ${
            isUser ? 'text-blue-100' : 'text-purple-300'
          }`}>
            <span>{time}</span>
            {isUser && (
              <div className="flex items-center space-x-1 ml-3">
                <CheckCircle className="w-3 h-3" />
                <span>Saved</span>
              </div>
            )}
          </div>

          {/* Tail */}
          <div className={`absolute bottom-0 ${
            isUser 
              ? '-right-2 border-l-[8px] border-l-blue-500 border-b-[8px] border-b-transparent' 
              : '-left-2 border-r-[8px] border-r-white/10 border-b-[8px] border-b-transparent'
          }`}></div>
        </div>
      </div>
    </div>
  );
}