import { Database } from '../db/Database';
import { User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export class UserRepository {
  private db = Database.getInstance();

  async list(): Promise<User[]> {
    const data = this.db.read();
    return data.users as User[];
  }

  async findById(id: string): Promise<User | null> {
    const users = await this.list();
    return users.find(u => u.id === id) ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = await this.list();
    return users.find(u => u.email === email) ?? null;
  }

  async create(payload: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const data = this.db.read();
    const user: User = { id: uuidv4(), ...payload, createdAt: new Date().toISOString() } as any;
    data.users.push(user);
    this.db.write();
    return user;
  }

  async update(id: string, payload: Partial<User>): Promise<User | null> {
    const data = this.db.read();
    const idx = data.users.findIndex((u: User) => u.id === id);
    if (idx === -1) return null;
    data.users[idx] = { ...data.users[idx], ...payload, updatedAt: new Date().toISOString() };
    this.db.write();
    return data.users[idx];
  }

  async delete(id: string): Promise<boolean> {
    const data = this.db.read();
    const initial = data.users.length;
    data.users = data.users.filter((u: User) => u.id !== id);
    this.db.write();
    return data.users.length < initial;
  }
}

export const UserRepositoryFactory = {
  create() {
    return new UserRepository();
  }
};
