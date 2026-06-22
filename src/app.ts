import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { errorHandler } from './middlewares/authMiddleware';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;