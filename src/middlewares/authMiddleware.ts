import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: any;
  }

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = verify(token, process.env.JWT_SECRET as string);
      // console.log('this is decoded', decoded);
      req.user = decoded;
      return next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
      return;
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token provided' });
    return;
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'User role not authorized to access this route' });
      return;
    }
    next();
  };
};