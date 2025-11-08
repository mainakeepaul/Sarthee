
// import mongoose from "mongoose"

// export const connectToDB=async()=>{
//     try {
//         mongoose.connect(process.env.MONGO_DB_URL,{
//             dbName:"test"
//         })
//         console.log("database connected!!!")
//     } catch (error) {
//         console.log("failed to connect to db")
//         console.log(error)
//     }
// }
import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

