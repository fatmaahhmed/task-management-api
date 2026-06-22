import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { taskSchema, querySchema } from '../utils/validators';
import * as taskController from '../controllers/taskController';

// mergeParams: true allows us to access :projectId from the parent router
const router = Router({ mergeParams: true });

// Top level routes without project id might be needed but per requirements, 
// tasks are under projects. The assessment says:
// Create a task under a project, Get all tasks for a specific project.
// But it also says: Get a single task by ID, Update task, Delete task.

router.use(protect);

router.post('/', validate(taskSchema), taskController.createTask);
router.get('/', validate(querySchema), taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validate(taskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
