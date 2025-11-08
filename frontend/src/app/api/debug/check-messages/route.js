import { NextResponse } from 'next/server';
import { connectToDB } from '@/helper/db';

export async function GET() {
  try {
    const mongoose = await connectToDB();
    const db = mongoose.connection.db;
    
    console.log('🔍 Checking for messages in all collections...');
    
    const collections = await db.listCollections().toArray();
    const results = {};
    
    for (const collection of collections) {
      console.log(`📖 Checking collection: ${collection.name}`);
      
      try {
        // Get sample documents from each collection
        const documents = await db.collection(collection.name)
          .find({})
          .limit(10)
          .toArray();
        
        results[collection.name] = {
          count: await db.collection(collection.name).countDocuments(),
          sample: documents.map(doc => {
            // Remove _id for cleaner output and convert to serializable format
            const { _id, ...rest } = doc;
            return {
              ...rest,
              _id: _id?.toString() // Convert ObjectId to string
            };
          })
        };
        
        console.log(`   Found ${results[collection.name].count} documents in ${collection.name}`);
      } catch (collectionError) {
        console.log(`   Error reading collection ${collection.name}:`, collectionError.message);
        results[collection.name] = {
          count: 0,
          sample: [],
          error: collectionError.message
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      database: db.databaseName,
      collections: results,
      totalCollections: collections.length
    });

  } catch (error) {
    console.error('Error checking messages:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      database: null,
      collections: {},
      totalCollections: 0
    }, { status: 500 });
  }
}