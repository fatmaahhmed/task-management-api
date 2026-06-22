import { Request, Response } from 'express';
import * as taskService from '../services/taskService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getTasks = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const { projectId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || 'createdAt';
  const order = (req.query.order as string) === 'asc' ? 'asc' : 'desc';

  const filters = {
    status: req.query.status as string,
    priority: req.query.priority as string,
  };

  try {
    const tasks = await taskService.getTasks(String(projectId), userId, filters, page, limit, sortBy, order);
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const getTaskById = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const task = await taskService.getTaskById(String(id), userId);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const projectId = req.params.projectId || req.body.projectId;
  
  if (!projectId) {
    res.status(400).json({ error: 'projectId is required' });
    return;
  }
  
  try {
    const task = await taskService.createTask(projectId, userId, req.body);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    const task = await taskService.updateTask(String(id), userId, req.body);
    res.status(200).json(task);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  const userId = req.user.userId;
  const { id } = req.params;

  try {
    await taskService.deleteTask(String(id), userId);
    res.status(200).json({ message: 'Task removed' });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
