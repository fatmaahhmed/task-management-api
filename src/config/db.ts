import mongoose from 'mongoose';
import seedDatabase from './seed';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    // use seed function here

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};