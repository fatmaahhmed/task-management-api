import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { projectSchema, querySchema } from '../utils/validators';
import * as projectController from '../controllers/projectController';
import taskRoutes from './task.routes';

const router = Router();

// Nested routes for tasks under projects
router.use('/:projectId/tasks', taskRoutes);

// Apply auth to all project routes
router.use(protect);

router.post('/', validate(projectSchema), projectController.createProject);
router.get('/', validate(querySchema), projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', validate(projectSchema), projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
