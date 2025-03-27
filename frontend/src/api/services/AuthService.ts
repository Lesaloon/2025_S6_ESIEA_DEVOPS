import apiClient from '../ApiClient';
import { User } from '../../models/User';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  userData: User;
  accessToken: string;
  refreshToken: string;
  newAccessToken: string;
  newRefreshToken: string;
}

export class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
    this.saveTokens(response.accessToken, response.refreshToken);
    return response;
  }

  public async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/register', userData);
    this.saveTokens(response.accessToken, response.refreshToken);
    return response;
  }

  public async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
    this.clearTokens();
  }

  public async refreshToken(): Promise<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
    this.saveTokens(response.newAccessToken, response.newRefreshToken);
    return response;
  }

  public async verifyEmail(token: string): Promise<void> {
    await apiClient.post('/auth/verify', { token });
  }

  public async forgotPassword(email: string): Promise<void> {
    await apiClient.post('/auth/forgot-password', { email });
  }

  public async resetPassword(token: string, password: string): Promise<void> {
    await apiClient.post('/auth/reset-password', { token, password });
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiClient.post('/auth/change-password', { oldPassword, newPassword });
  }

  public async updateProfile(userData: Partial<User>): Promise<User> {
    return await apiClient.post<User>('/auth/update-profile', userData);
  }

  public async deleteAccount(): Promise<void> {
    await apiClient.post('/auth/delete-account');
    this.clearTokens();
  }

  public async getProfile(): Promise<User> {
    const response = await apiClient.get<{user: User}>('/auth/profile');
    return response.user;
  }

  public isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private saveTokens(token: string, refreshToken: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
  }

  private clearTokens(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }
}

export default AuthService.getInstance();
