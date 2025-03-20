import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async updateUser(id: string, user: Partial<Omit<User, 'id'>>): Promise<User | null> {
    return this.userRepository.update(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getUsersByRole(role: 'admin' | 'user'): Promise<User[]> {
    return this.userRepository.findByRole(role);
  }

  async listUsers(page: number, limit: number): Promise<{ users: User[]; total: number }> {
    return this.userRepository.listUsers(page, limit);
  }

  async performTransaction<T>(callback: (session: any) => Promise<T>): Promise<T> {
    return this.userRepository.withTransaction(callback);
  }
}