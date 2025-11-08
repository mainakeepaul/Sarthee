// // import { NextResponse } from 'next/server';
// // import ChatMessage from '@/models/ChatMessage';
// // import { connectToDB } from '@/helper/db';

// // export async function POST(request) {
// //   try {
// //     await connectToDB();
    
// //     const { userId, content, isUser, sessionId } = await request.json();
    
// //     if (!userId || !content || typeof isUser !== 'boolean') {
// //       return NextResponse.json(
// //         { error: 'Missing required fields' },
// //         { status: 400 }
// //       );
// //     }

// //     const message = new ChatMessage({
// //       userId,
// //       content,
// //       isUser,
// //       sessionId: sessionId || 'default-session',
// //       timestamp: new Date()
// //     });

// //     await message.save();

// //     return NextResponse.json({ 
// //       success: true, 
// //       message: {
// //         _id: message._id,
// //         userId: message.userId,
// //         content: message.content,
// //         isUser: message.isUser,
// //         timestamp: message.timestamp
// //       }
// //     });
// //   } catch (error) {
// //     console.error('Error saving message:', error);
// //     return NextResponse.json(
// //       { error: 'Internal server error' },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { NextResponse } from 'next/server';
// import ChatMessage from '@/models/ChatMessage';
// import { connectToDB } from '@/helper/db';

// export async function POST(request) {
//   try {
//     console.log('🔵 Connecting to MongoDB...');
//     await connectToDB();
//     console.log('✅ Connected to MongoDB');

//     const body = await request.json();
//     console.log('📨 Received message data:', body);

//     const { userId, content, isUser, sessionId = 'default-session' } = body;
    
//     // Validation
//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required', success: false },
//         { status: 400 }
//       );
//     }

//     if (!content || content.trim() === '') {
//       return NextResponse.json(
//         { error: 'Message content cannot be empty', success: false },
//         { status: 400 }
//       );
//     }

//     if (typeof isUser !== 'boolean') {
//       return NextResponse.json(
//         { error: 'isUser must be a boolean (true or false)', success: false },
//         { status: 400 }
//       );
//     }

//     // Create new message
//     const messageData = {
//       userId,
//       content: content.trim(),
//       isUser,
//       sessionId,
//       timestamp: new Date()
//     };

//     console.log('💾 Saving message to database:', messageData);

//     const message = new ChatMessage(messageData);
//     const savedMessage = await message.save();

//     console.log('✅ Message saved successfully:', savedMessage._id);

//     return NextResponse.json({ 
//       success: true, 
//       message: {
//         _id: savedMessage._id,
//         userId: savedMessage.userId,
//         content: savedMessage.content,
//         isUser: savedMessage.isUser,
//         timestamp: savedMessage.timestamp,
//         sessionId: savedMessage.sessionId
//       }
//     }, { status: 201 });

//   } catch (error) {
//     console.error('❌ Error saving message:', error);
    
//     // MongoDB duplicate key error
//     if (error.code === 11000) {
//       return NextResponse.json(
//         { error: 'Message already exists', success: false },
//         { status: 409 }
//       );
//     }

//     // MongoDB validation error
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(err => err.message);
//       return NextResponse.json(
//         { error: errors.join(', '), success: false },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json(
//       { error: 'Internal server error', details: error.message, success: false },
//       { status: 500 }
//     );
//   }
// }

// // GET all messages for a user (optional)
// export async function GET(request) {
//   try {
//     await connectToDB();

//     const { searchParams } = new URL(request.url);
//     const userId = searchParams.get('userId');
//     const sessionId = searchParams.get('sessionId') || 'default-session';

//     if (!userId) {
//       return NextResponse.json(
//         { error: 'User ID is required', success: false },
//         { status: 400 }
//       );
//     }

//     const messages = await ChatMessage.find({ 
//       userId, 
//       sessionId 
//     }).sort({ timestamp: 1 });

//     return NextResponse.json({ 
//       success: true, 
//       messages,
//       count: messages.length 
//     });

//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return NextResponse.json(
//       { error: 'Internal server error', success: false },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import ChatMessage from '@/models/ChatMessage';
import { connectToDB } from '@/helper/db';

export async function POST(request) {
  try {
    await connectToDB();
    
    const { userId, content, isUser, sessionId } = await request.json();
    
    if (!userId || !content || typeof isUser !== 'boolean') {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const message = new ChatMessage({
      userId,
      content,
      isUser,
      sessionId: sessionId || 'default-session',
      timestamp: new Date()
    });

    await message.save();

    return NextResponse.json({ 
      success: true, 
      message: {
        _id: message._id,
        userId: message.userId,
        content: message.content,
        isUser: message.isUser,
        timestamp: message.timestamp
      }
    });
  } catch (error) {
    console.error('Error saving message:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}