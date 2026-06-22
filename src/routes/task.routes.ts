import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { validate } from '../middlewares/validateMiddleware';
import { taskSchema, querySchema } from '../utils/validators';
import * as taskController from '../controllers/taskController';

const router = Router({ mergeParams: true });
router.use(protect);
router.post('/', validate(taskSchema), taskController.createTask);
router.get('/', validate(querySchema), taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', validate(taskSchema), taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
