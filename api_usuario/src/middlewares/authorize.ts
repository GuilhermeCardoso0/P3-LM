import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';

export function authorize(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: 'Não autenticado' });
    if (!allowedRoles.includes(user.role)) return res.status(403).json({ message: 'Permissão negada' });
    next();
  };
}
