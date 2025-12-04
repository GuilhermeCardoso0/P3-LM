import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';
import jwt from 'jsonwebtoken';

const service = new UserService();
const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, role } = req.body;
      const user = await service.create({ name, email, password, role });
      res.status(201).json(user);
    } catch (err) { next(err); }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await service.authenticate(email, password);
      if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });
      const token = jwt.sign({ sub: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
      res.json({ token, user });
    } catch (err) { next(err); }
  }
}
