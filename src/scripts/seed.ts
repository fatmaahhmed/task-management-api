import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../models/User';
import Project from '../models/Project';
import Task from '../models/Task';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected for Seeding...');

    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    const user = await User.create({
      name: 'Test Reviewer',
      email: 'reviewer@example.com',
      password: hashedPassword
    });

    const project = await Project.create({
      title: 'Task Management System',
      description: 'Reviewing the take-home assignment',
      status: 'Active',
      user: user._id
    });

    await Task.create([
      { title: 'Check Code Architecture', status: 'Done', priority: 'High', project: project._id },
      { title: 'Test APIs in Postman', status: 'In Progress', priority: 'High', project: project._id },
      { title: 'Review Docker Compose', status: 'To Do', priority: 'Medium', project: project._id }
    ]);

    console.log('Database Seeded Successfully! 🌱');
    process.exit();
  } catch (error) {
    console.error('Error Seeding Database:', error);
    process.exit(1);
  }
};

seedDatabase();