import { Request, Response } from 'express';
import * as projectService from '../services/projectService';
import { AuthRequest } from '../middlewares/authMiddleware';

export const getProjects = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const sortBy = (req.query.sortBy as string) || 'createdAt';
  const order = (req.query.order as string) === 'asc' ? 'asc' : 'desc';

  const projects = await projectService.getProjects(userId, page, limit, sortBy, order);
  res.status(200).json(projects);
};

export const getProjectById = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const project = await projectService.getProjectById(String(id), userId);
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const createProject = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  
  const project = await projectService.createProject(req.body, userId);
  res.status(201).json(project);
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    const project = await projectService.updateProject(String(id), userId, req.body);
    res.status(200).json(project);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;
  const { id } = req.params;

  try {
    await projectService.deleteProject(String(id), userId);
    res.status(200).json({ message: 'Project removed' });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
