import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

const service = new UserService();

function hidePassword(user: any) {
  if (!user) return user;
  const { password, ...rest } = user;
  return rest;
}

export class UserController {
  static async list(req: Request, res: Response, next: NextFunction) {
    try { const users = await service.list(); res.json(users.map(hidePassword)); } catch (err) { next(err); }
  }

  static async get(req: Request, res: Response, next: NextFunction) {
    try { const user = await service.get(req.params.id); if (!user) return res.status(404).json({ message: 'Not found' }); res.json(hidePassword(user)); } catch (err) { next(err); }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try { const user = await service.create(req.body); res.status(201).json(hidePassword(user)); } catch (err: any) { next(err); }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try { const user = await service.update(req.params.id, req.body); if (!user) return res.status(404).json({ message: 'Not found' }); res.json(hidePassword(user)); } catch (err) { next(err); }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try { const ok = await service.delete(req.params.id); if (!ok) return res.status(404).json({ message: 'Not found' }); res.status(204).send(); } catch (err) { next(err); }
  }
}
