import { User } from '../models/User';

export interface UserRepository {
  // CRUD Operations
  create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User | null>;
  delete(id: string): Promise<void>;

  // Query Methods
  findByEmail(email: string): Promise<User | null>;
  findByRole(role: 'admin' | 'user'): Promise<User[]>;

  // Pagination
  listUsers(page: number, limit: number): Promise<{ users: User[]; total: number }>;

  // Transaction Support
  withTransaction<T>(callback: (session: any) => Promise<T>): Promise<T>;
}