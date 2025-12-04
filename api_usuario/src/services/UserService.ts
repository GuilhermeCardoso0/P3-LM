import { UserRepositoryFactory } from '../repositories/UserRepository';
import { eventBus } from '../events/eventBus';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export class UserService {
  private repo = UserRepositoryFactory.create();

  async list() { return this.repo.list(); }

  async get(id: string) { return this.repo.findById(id); }

  async create(data: { name: string; email: string; password?: string; role: User['role'] }) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new Error('E-mail já cadastrado');
    const hashed = data.password ? await bcrypt.hash(data.password, 10) : undefined;
    const user = await this.repo.create({ name: data.name, email: data.email, password: hashed, role: data.role } as any);
    eventBus.emit('user.created', user);
    return user;
  }

  async update(id: string, payload: Partial<User>) { return this.repo.update(id, payload); }

  async delete(id: string) { return this.repo.delete(id); }

  async authenticate(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user || !user.password) return null;
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return null;
    // remove password before returning
    const { password: _p, ...rest } = user as any;
    return rest as User;
  }
}
