import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const connection = await mongoose.connect(String(process.env.MONGODB_URI));
    console.log("MongoDB connected");
    return connection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
