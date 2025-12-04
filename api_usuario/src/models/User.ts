export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // hashed
  role: 'admin' | 'manager' | 'user';
  createdAt: string;
  updatedAt?: string;
}
