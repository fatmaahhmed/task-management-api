import Task, { ITask } from '../models/Task';
import Project from '../models/Project';

export const getTasks = async (projectId: string | undefined, userId: string, filters: any = {}, page: number = 1, limit: number = 10, sortBy: string = 'createdAt', order: 'asc' | 'desc' = 'desc') => {
  const query: any = {};

  if (projectId) {
    const project = await Project.findOne({ _id: projectId, user: userId });
    if (!project) throw new Error('Project not found');
    query.project = projectId;
  } else {
    const userProjects = await Project.find({ user: userId }).select('_id');
    query.project = { $in: userProjects.map(p => p._id) };
  }

  const skip = (page - 1) * limit;
  const sortOptions: any = {};
  sortOptions[sortBy] = order === 'asc' ? 1 : -1;
  
  if (filters.status) query.status = filters.status;
  if (filters.priority) query.priority = filters.priority;

  const tasks = await Task.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(query);

  return {
    data: tasks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId).populate('project');
  if (!task) throw new Error('Task not found');
  
  // Type assertion or check since populate replaces ID with document
  const project = task.project as any;
  if (project.user.toString() !== userId) {
    throw new Error('Task not found');
  }

  return task;
};

export const createTask = async (projectId: string, userId: string, data: Partial<ITask>) => {
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) throw new Error('Project not found');

  const task = new Task({ ...data, project: projectId });
  await task.save();
  return task;
};

export const updateTask = async (taskId: string, userId: string, data: Partial<ITask>) => {
  const task = await Task.findById(taskId).populate('project');
  if (!task) throw new Error('Task not found');
  
  const project = task.project as any;
  if (project.user.toString() !== userId) {
    throw new Error('Task not found');
  }

  Object.assign(task, data);
  await task.save();
  return task;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await Task.findById(taskId).populate('project');
  if (!task) throw new Error('Task not found');
  
  const project = task.project as any;
  if (project.user.toString() !== userId) {
    throw new Error('Task not found');
  }

  await Task.deleteOne({ _id: taskId });
  return task;
};
