import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export interface AuthRequest extends Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: 'Token não fornecido' });
  const parts = header.split(' ');
  if (parts.length !== 2) return res.status(401).json({ message: 'Token inválido' });
  const token = parts[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as any;
    req.user = { id: payload.sub, role: payload.role, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}
