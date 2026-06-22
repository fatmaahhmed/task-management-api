import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/User';
import Project from './models/Project';
import Task from './models/Task';

dotenv.config();

const seedDatabase = async (runStandalone: boolean = true) => {
  try {
    if (runStandalone && mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/project_management');
      console.log('MongoDB Connected for Seeding...');
    }

    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password123 = await bcrypt.hash('password123', salt);
    const adminPassword = await bcrypt.hash('admin123', salt);

    // 1. Create Users
    const adminUser = await User.create({
      name: 'System Admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'Admin'
    });

    const memberUser1 = await User.create({
      name: 'Alice Developer',
      email: 'alice@example.com',
      password: password123,
      role: 'Member'
    });

    const memberUser2 = await User.create({
      name: 'Bob Designer',
      email: 'bob@example.com',
      password: password123,
      role: 'Member'
    });

    // 2. Create Projects
    const project1 = await Project.create({
      title: 'E-commerce Redesign',
      description: 'Redesigning the entire frontend for the e-commerce platform',
      status: 'Active',
      user: memberUser1._id
    });

    const project2 = await Project.create({
      title: 'Backend API Migration',
      description: 'Migrating legacy APIs to Node.js and Express',
      status: 'Active',
      user: memberUser1._id
    });

    const project3 = await Project.create({
      title: 'Marketing Landing Page',
      description: 'Creating a new landing page for Q3 marketing campaign',
      status: 'Completed',
      user: memberUser2._id
    });

    // 3. Create Tasks for Project 1 (Alice)
    await Task.create([
      { title: 'Setup React Router', description: 'Configure routing for main pages', status: 'Done', priority: 'High', project: project1._id },
      { title: 'Design System Implementation', description: 'Implement core UI components', status: 'In Progress', priority: 'High', project: project1._id },
      { title: 'Product Page Layout', description: 'Build the PDP layout', status: 'To Do', priority: 'Medium', project: project1._id },
      { title: 'Cart State Management', description: 'Setup Redux for cart', status: 'To Do', priority: 'High', project: project1._id }
    ]);

    // 4. Create Tasks for Project 2 (Alice)
    await Task.create([
      { title: 'Database Schema Design', description: 'Design MongoDB schemas', status: 'Done', priority: 'High', project: project2._id },
      { title: 'Auth Endpoints', description: 'Implement JWT login/register', status: 'Done', priority: 'High', project: project2._id },
      { title: 'Payment Integration', description: 'Stripe webhook setup', status: 'In Progress', priority: 'High', project: project2._id }
    ]);

    // 5. Create Tasks for Project 3 (Bob)
    await Task.create([
      { title: 'Hero Section Assets', description: 'Create vector assets for hero', status: 'Done', priority: 'Medium', project: project3._id },
      { title: 'Mobile Responsiveness', description: 'Fix CSS grid on mobile', status: 'Done', priority: 'High', project: project3._id },
      { title: 'SEO Optimization', description: 'Add meta tags and descriptions', status: 'Done', priority: 'Low', project: project3._id }
    ]);

    console.log('Database Seeded Successfully! 🌱');
    if (runStandalone) {
      console.log('--- Test Accounts ---');
      console.log('Admin: admin@example.com / admin123');
      console.log('Member: alice@example.com / password123');
      console.log('Member: bob@example.com / password123');
      process.exit();
    }
  } catch (error) {
    console.error('Error Seeding Database:', error);
    if (runStandalone) {
      process.exit(1);
    }
  }
};

// Check if running directly
if (require.main === module) {
  seedDatabase(true);
}

export default seedDatabase; 