import mongoose from 'mongoose';
import seedDatabase from '../seed';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto-seed the database on connection
    await seedDatabase(false);
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;