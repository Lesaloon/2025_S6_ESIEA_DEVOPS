import apiClient from '../ApiClient';
import { User } from '../../models/User';

export class UserService {
  private static instance: UserService;

  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getAllUsers(): Promise<User[]> {
    return await apiClient.get<User[]>('/users');
  }

  public async getUserById(id: number): Promise<User> {
    return await apiClient.get<User>(`/users/${id}`);
  }

  public async createUser(user: Omit<User, 'id'>): Promise<User> {
    return await apiClient.post<User>('/users', user);
  }

  public async updateUser(id: number, user: Partial<User>): Promise<User> {
    return await apiClient.put<User>(`/users/${id}`, user);
  }

  public async deleteUser(id: number): Promise<boolean> {
    return await apiClient.delete<boolean>(`/users/${id}`);
  }
}

export default UserService.getInstance();
