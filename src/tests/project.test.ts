import { Request, Response } from 'express';
import { getProjects } from '../controllers/projectController';
import * as projectService from '../services/projectService';
import { AuthRequest } from '../middlewares/authMiddleware';

jest.mock('../services/projectService');

describe('Project Controller', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    req = {
      user: { id: 'user123' },
      query: { page: '1', limit: '10' }
    };
    res = {
      status: statusMock,
    };
  });

  it('should return projects', async () => {
    const mockProjects = {
      data: [{ title: 'Project 1' }],
      meta: { total: 1, page: 1, limit: 10, totalPages: 1 }
    };

    (projectService.getProjects as jest.Mock).mockResolvedValue(mockProjects);

    await getProjects(req as AuthRequest, res as Response);

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(mockProjects);
  });
});
