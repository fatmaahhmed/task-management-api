import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const projectSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().optional(),
    status: z.enum(['Active', 'Completed']).optional(),
  }),
});

export const taskSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional(),
    status: z.enum(['To Do', 'In Progress', 'Done']).optional(),
    priority: z.enum(['Low', 'Medium', 'High']).optional(),
    dueDate: z.string().optional(), // We receive as string, DB handles date
    projectId: z.string().optional() // Can be passed in body or params depending on route
  }),
});

export const querySchema = z.object({
  query: z.object({
    page: z.string().optional().transform(Number).refine(n => !isNaN(n) && n > 0, { message: "Page must be a positive number" }).optional(),
    limit: z.string().optional().transform(Number).refine(n => !isNaN(n) && n > 0, { message: "Limit must be a positive number" }).optional(),
    sortBy: z.string().optional(),
    order: z.enum(['asc', 'desc']).optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
  })
});