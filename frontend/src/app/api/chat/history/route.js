// import { NextResponse } from 'next/server';
// import ChatMessage from '@/models/ChatMessage';
// import { connectToDB } from '@/helper/db';

// export async function POST(request) {
//   try {
//     await connectToDB();
    
//     const { userId, content, isUser, sessionId } = await request.json();
    
//     if (!userId || !content || typeof isUser !== 'boolean') {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }

//     const message = new ChatMessage({
//       userId,
//       content,
//       isUser,
//       sessionId: sessionId || 'default-session',
//       timestamp: new Date()
//     });

//     await message.save();

//     return NextResponse.json({ 
//       success: true, 
//       message: {
//         _id: message._id,
//         userId: message.userId,
//         content: message.content,
//         isUser: message.isUser,
//         timestamp: message.timestamp
//       }
//     });
//   } catch (error) {
//     console.error('Error saving message:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from 'next/server';
import ChatMessage from '@/models/ChatMessage';
import { connectToDB } from '@/helper/db';

export async function GET(request) {
  try {
    console.log('🔵 Fetching chat history...');
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId') || 'default-session';
    
    console.log('📋 Query params:', { userId, sessionId });

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', success: false },
        { status: 400 }
      );
    }

    const messages = await ChatMessage.find({ 
      userId, 
      sessionId 
    }).sort({ timestamp: 1 }).lean();

    console.log(`✅ Found ${messages.length} messages for user ${userId}`);

    return NextResponse.json({ 
      success: true, 
      messages: messages.map(msg => ({
        ...msg,
        _id: msg._id.toString(),
        timestamp: msg.timestamp.toISOString()
      })),
      count: messages.length 
    });

  } catch (error) {
    console.error('❌ Error fetching chat history:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message, success: false },
      { status: 500 }
    );
  }
}