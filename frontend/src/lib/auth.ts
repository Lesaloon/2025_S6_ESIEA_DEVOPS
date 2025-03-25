import { create } from 'zustand';
import { User } from '@/models/User';
import { useMockData } from '@/contexts/MockDataContext';

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { users } = useMockData();
      const user = users.find(user => user.email === email && user.password === password);
      
      if (user) {
        const token = btoa(`${email}:${password}`);
        localStorage.setItem('token', token);
        set({ token, user, isLoading: false });
      } else {
        throw new Error('Email ou mot de passe incorrect');
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
        isLoading: false 
      });
    }
  },

  register: async (name: string, email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post('/api/auth/register', { name, email, password });
      const { token } = response.data;
      
      localStorage.setItem('token', token);
      const user = jwtDecode<User>(token);
      
      set({ token, user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Une erreur est survenue',
        isLoading: false 
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));