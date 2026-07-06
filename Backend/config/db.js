import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("Missing MongoDB connection string. Set MONGO_URI or MONGODB_URI in your .env or Render environment.");
  }

  if (mongoUri.includes("<db_password>")) {
    throw new Error("Your MongoDB URI still contains the placeholder <db_password>. Replace it with your actual Atlas password.");
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default connectDB;