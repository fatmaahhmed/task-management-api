import Project, { IProject } from '../models/Project';

export const getProjects = async (userId: string, page: number = 1, limit: number = 10, sortBy: string = 'createdAt', order: 'asc' | 'desc' = 'desc') => {
  const skip = (page - 1) * limit;
  const sortOptions: any = {};
  sortOptions[sortBy] = order === 'asc' ? 1 : -1;

  const projects = await Project.find({ user: userId })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const total = await Project.countDocuments({ user: userId });

  return {
    data: projects,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProjectById = async (projectId: string, userId: string) => {
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) throw new Error('Project not found');
  return project;
};

export const createProject = async (data: Partial<IProject>, userId: string) => {
  const project = new Project({ ...data, user: userId });
  await project.save();
  return project;
};

export const updateProject = async (projectId: string, userId: string, data: Partial<IProject>) => {
  const project = await Project.findOneAndUpdate(
    { _id: projectId, user: userId },
    data,
    { new: true, runValidators: true }
  );
  if (!project) throw new Error('Project not found');
  return project;
};

export const deleteProject = async (projectId: string, userId: string) => {
  const project = await Project.findOneAndDelete({ _id: projectId, user: userId });
  if (!project) throw new Error('Project not found');
  return project;
};
