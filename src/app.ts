import express from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorMiddleware';
import authRoutes from './routes/authRoutes';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
import taskRoutes from './routes/task.routes';

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);    
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use(errorHandler);

export default app;