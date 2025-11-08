// import ChatInterface from '../../components/ChatInterface';

// // In a real app, you'd get this from authentication
// const CURRENT_USER_ID = "user123"; // Replace with actual user ID from your auth system

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-100">
//       <ChatInterface userId={CURRENT_USER_ID} />
//     </main>
//   );
// }


'use client';
import { useContext, useState } from 'react';
import ChatInterface from '../../components/ChatInterface';
import TestChat from '../../components/TestChat';
import UserContext from '@/context/userContext';

const CURRENT_USER_ID = "user123";

export default function Home() {

  const ctx = useContext(UserContext);
  const isLoggedIn = Boolean(ctx && ctx.user);
  console.log(ctx)
  console.log(ctx.user?._id)


  const [showTest, setShowTest] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Test Toggle Button */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={() => setShowTest(!showTest)}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-purple-600"
        >
          {showTest ? 'Hide Test' : 'Show Test'}
        </button>
      </div>

      {showTest ? (
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Database Test</h1>
          <TestChat />
        </div>
      ) : (
        <ChatInterface userId={CURRENT_USER_ID} />
      )}
    </main>
  );
}