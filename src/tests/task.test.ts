import { Request, Response } from 'express';
import { getTasks } from '../controllers/taskController';
import * as taskService from '../services/taskService';
import { AuthRequest } from '../middlewares/authMiddleware';

jest.mock('../services/taskService');

describe('Task Controller', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      user: { id: 'user123' },
      params: { projectId: 'project123' },
      query: {}
    };
    res = {
      status: statusMock,
    };
  });

  it('should return tasks for a project', async () => {
    const mockTasks = {
      data: [{ title: 'Task 1' }],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 }
    };

    (taskService.getTasks as jest.Mock).mockResolvedValue(mockTasks);

    await getTasks(req as AuthRequest, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockTasks);
  });
});
