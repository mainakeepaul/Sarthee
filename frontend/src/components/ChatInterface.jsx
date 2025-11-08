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
// ===============================================================================================

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
//       console.log('🔄 Fetching chat history for user:', userId);
//       const response = await fetch(`/api/chat/history?userId=${userId}`);
//       const data = await response.json();
      
//       console.log('📨 History API response:', data);
      
//       if (response.ok && data.success) {
//         // Convert timestamp strings back to Date objects
//         const messagesWithDates = data.messages.map(msg => ({
//           ...msg,
//           timestamp: new Date(msg.timestamp)
//         }));
//         setMessages(messagesWithDates);
//         console.log('✅ Chat history loaded:', messagesWithDates.length, 'messages');
//       } else {
//         console.error('❌ Error fetching history:', data.error);
//         setMessages([]);
//       }
//     } catch (error) {
//       console.error('❌ Network error fetching chat history:', error);
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
//       content: content.trim(),
//       isUser: true,
//       timestamp: new Date()
//     };

//     console.log('📤 Sending user message:', userMessage);

//     // Optimistically add user message
//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       // 1. Save user message to database
//       console.log('💾 Saving user message to DB...');
//       const userSaveResult = await saveMessageToDB(userMessage);
//       console.log('✅ User message saved:', userSaveResult);

//       // 2. Generate AI response (replace with your actual AI API)
//       console.log('🤖 Generating AI response...');
//       const aiResponse = await generateAIResponse(content);
      
//       const aiMessage = {
//         userId,
//         content: aiResponse,
//         isUser: false,
//         timestamp: new Date()
//       };

//       // 3. Save AI message to database
//       console.log('💾 Saving AI message to DB...');
//       const aiSaveResult = await saveMessageToDB(aiMessage);
//       console.log('✅ AI message saved:', aiSaveResult);
      
//       // 4. Add AI message to state
//       setMessages(prev => [...prev, aiMessage]);
      
//     } catch (error) {
//       console.error('❌ Error in message flow:', error);
      
//       // Show error message to user
//       const errorMessage = {
//         userId,
//         content: "Sorry, there was an error. Please check your connection and try again.",
//         isUser: false,
//         timestamp: new Date()
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const saveMessageToDB = async (message) => {
//     console.log('📡 Calling chat API...');
//     const response = await fetch('/api/chat', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(message),
//     });

//     const result = await response.json();
//     console.log('📡 API Response:', result);

//     if (!response.ok) {
//       throw new Error(result.error || 'Failed to save message');
//     }

//     return result;
//   };

//   const generateAIResponse = async (userMessage) => {
//     // Replace this with your actual AI API integration
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(`Thanks for your message: "${userMessage}". I'm your AI assistant! This response is saved to MongoDB.`);
//       }, 1000);
//     });
//   };

//   return (
//     <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-lg">
//       {/* Chat Header */}
//       <div className="bg-blue-600 text-white p-4">
//         <h1 className="text-xl font-semibold">ChatBot</h1>
//         <p className="text-sm opacity-90">User: {userId}</p>
//         <p className="text-xs opacity-75">Messages: {messages.length}</p>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
//         {messages.length === 0 ? (
//           <div className="text-center text-gray-500 mt-8">
//             <p>No messages yet. Start a conversation!</p>
//             <p className="text-sm mt-2">All messages will be saved to MongoDB</p>
//           </div>
//         ) : (
//           messages.map((message, index) => (
//             <MessageBubble key={message._id || `msg-${index}`} message={message} />
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
import { Bot, User, Sparkles, Database } from 'lucide-react';

export default function ChatInterface({ userId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat history on component mount
  useEffect(() => {
    fetchChatHistory();
  }, [userId]);

  const fetchChatHistory = async () => {
    try {
      const response = await fetch(`/api/chat/history?userId=${userId}`);
      const data = await response.json();
      
      if (response.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    // Optimistically add user message
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Save user message to database
      await saveMessageToDB(userMessage);

      // Generate AI response
      const aiResponse = await generateAIResponse(content);
      
      const aiMessage = {
        userId,
        content: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      // Save AI message to database
      await saveMessageToDB(aiMessage);
      
      // Add AI message to state
      setMessages(prev => [...prev, aiMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      // Show error message
      const errorMessage = {
        userId,
        content: "Sorry, I encountered an error. Please try again.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const saveMessageToDB = async (message) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error('Failed to save message to database');
    }

    return response.json();
  };

  const generateAIResponse = async (userMessage) => {
    // Simulate AI thinking and response
    return new Promise((resolve) => {
      setTimeout(() => {
        const responses = [
          `I understand you're saying: "${userMessage}". That's an interesting point! How can I help you further?`,
          `Thanks for sharing: "${userMessage}". I've saved this to our database. What would you like to know next?`,
          `I've processed your message about "${userMessage}". The data has been stored securely. How can I assist you further?`,
          `Great question about "${userMessage}"! I'm here to help with any information you need.`,
          `I appreciate you mentioning "${userMessage}". Let me know what other topics you'd like to explore!`
        ];
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1500 + Math.random() * 1000);
    });
  };

  const clearChat = async () => {
    if (confirm('Are you sure you want to clear all messages?')) {
      setMessages([]);
      // In a real app, you'd also call an API to clear from database
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white/5 backdrop-blur-xl rounded-none lg:rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Sarthee: Your AI Assistant</h1>
              <div className="flex items-center space-x-2 text-sm text-purple-200">
                <Database className="w-3 h-3" />
                <span>All conversations saved to database</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={clearChat}
              className="px-4 py-2 text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-200 border border-white/10 hover:border-white/20"
            >
              Clear Chat
            </button>
            <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <User className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-white font-medium">{userId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center border border-white/10">
              <Sparkles className="w-8 h-8 text-purple-400" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-white">Welcome to Sarthee AI</h3>
              <p className="text-purple-200 max-w-md">
                Start a conversation and watch as your messages are automatically saved to our secure database. Everything is preserved for future reference.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-green-400 bg-green-400/10 px-4 py-2 rounded-full border border-green-400/20">
              <Database className="w-4 h-4" />
              <span>Database Connected</span>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <MessageBubble key={message._id || index} message={message} />
          ))
        )}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl rounded-bl-none px-6 py-4 max-w-xs lg:max-w-md">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <p className="text-xs text-purple-300 mt-2">Sarthee AI is thinking...</p>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t border-white/10 bg-white/5 backdrop-blur-lg p-6">
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}