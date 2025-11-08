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

export default function MessageBubble({ message }) {
  if (!message) return null;

  const isUser = message.isUser;
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? 'text-blue-200' : 'text-gray-500'}`}>
          {new Date(message.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}