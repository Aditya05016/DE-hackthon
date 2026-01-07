import mongoose from "mongoose";

const connectDb = async (): Promise<void> => {
  try {
    const mongoUri: string = process.env.MONGO_URI as string;

    await mongoose.connect(mongoUri);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectDb;
