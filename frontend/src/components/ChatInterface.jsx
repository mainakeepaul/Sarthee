// 'use client';
// import { useState, useEffect, useRef } from 'react';
// import MessageBubble from './MessageBubble';
// import ChatInput from './ChatInput';

// export default function ChatInterface({ userId }) {
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   // Fetch chat history on component mount
//   useEffect(() => {
//     fetchChatHistory();
//   }, [userId]);

//   const fetchChatHistory = async () => {
//     try {
//       const response = await fetch(`/api/chat/history?userId=${userId}`);
//       const data = await response.json();
      
//       if (response.ok) {
//         setMessages(data.messages || []);
//       } else {
//         console.error('Error fetching history:', data.error);
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error('Error fetching chat history:', error);
//       setMessages([]);
//     }
//   };

//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async (content) => {
//     if (!content.trim()) return;

//     const userMessage = {
//       userId,
//       content,
//       isUser: true,
//       timestamp: new Date()
//     };

//     // Optimistically add user message
//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       // Save user message to database
//       await saveMessageToDB(userMessage);

//       // Simulate AI response (replace with your actual AI API call)
//       const aiResponse = await generateAIResponse(content);
      
//       const aiMessage = {
//         userId,
//         content: aiResponse,
//         isUser: false,
//         timestamp: new Date()
//       };

//       // Save AI message to database
//       await saveMessageToDB(aiMessage);
      
//       // Add AI message to state
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       // Show error message to user
//       const errorMessage = {
//         userId,
//         content: "Sorry, there was an error sending your message. Please try again.",
//         isUser: false,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveMessageToDB = async (message) => {
//     const response = await fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to save message');
//     }

//     return response.json();
//   };

//   const generateAIResponse = async (userMessage) => {
//     // Replace this with your actual AI API integration
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`I received your message: "${userMessage}". This is a simulated response from your AI backend. Connect this to your actual AI service!`);
//       }, 1000);
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg">
//       {/* Chat Header */}
//       <div className="bg-blue-600 text-white p-4">
//         <h1 className="text-xl font-semibold">ChatBot</h1>
//         <p className="text-sm opacity-90">User: {userId}</p>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 mt-8">
//             <p>No messages yet. Start a conversation!</p>
//           </div>
//         ) : (
//           messages.map((message, index) => (
//             <MessageBubble key={message._id || index} message={message} />
//           ))
//         )}
        
//         {isLoading && (
//           <div className="flex justify-start">
//             <div className="bg-gray-200 rounded-lg p-4 max-w-xs">
//               <div className="flex space-x-2">
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//               </div>
//             </div>
//           </div>
//         )}
        
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input */}
//       <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
//     </div>
//   );
// }

'use client';
import { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export default function ChatInterface({ userId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  const fetchChatHistory = async () => {
    try {
      console.log('🔄 Fetching chat history for user:', userId);
      const response = await fetch(`/api/chat/history?userId=${userId}`);
      const data = await response.json();
      
      console.log('📨 History API response:', data);
      
      if (response.ok && data.success) {
        // Convert timestamp strings back to Date objects
        const messagesWithDates = data.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
        console.log('✅ Chat history loaded:', messagesWithDates.length, 'messages');
      } else {
        console.error('❌ Error fetching history:', data.error);
        setMessages([]);
      }
    } catch (error) {
      console.error('❌ Network error fetching chat history:', error);
      setMessages([]);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content) => {
    if (!content.trim()) return;

    const userMessage = {
      userId,
      content: content.trim(),
      isUser: true,
      timestamp: new Date()
    };

    console.log('📤 Sending user message:', userMessage);

    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // 1. Save user message to database
      console.log('💾 Saving user message to DB...');
      const userSaveResult = await saveMessageToDB(userMessage);
      console.log('✅ User message saved:', userSaveResult);

      // 2. Generate AI response (replace with your actual AI API)
      console.log('🤖 Generating AI response...');
      const aiResponse = await generateAIResponse(content);
      
      const aiMessage = {
        userId,
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      // 3. Save AI message to database
      console.log('💾 Saving AI message to DB...');
      const aiSaveResult = await saveMessageToDB(aiMessage);
      console.log('✅ AI message saved:', aiSaveResult);
      
      // 4. Add AI message to state
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('❌ Error in message flow:', error);
      
      // Show error message to user
      const errorMessage = {
        userId,
        content: "Sorry, there was an error. Please check your connection and try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMessageToDB = async (message) => {
    console.log('📡 Calling chat API...');
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();
    console.log('📡 API Response:', result);

    if (!response.ok) {
      throw new Error(result.error || 'Failed to save message');
    }

    return result;
  };

  const generateAIResponse = async (userMessage) => {
    // Replace this with your actual AI API integration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Thanks for your message: "${userMessage}". I'm your AI assistant! This response is saved to MongoDB.`);
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-semibold">ChatBot</h1>
        <p className="text-sm opacity-90">User: {userId}</p>
        <p className="text-xs opacity-75">Messages: {messages.length}</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p>No messages yet. Start a conversation!</p>
            <p className="text-sm mt-2">All messages will be saved to MongoDB</p>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={message._id || `msg-${index}`} message={message} />
          ))
        )}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 rounded-lg p-4 max-w-xs">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
}