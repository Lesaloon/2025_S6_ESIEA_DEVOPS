import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/models/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const users: User[] = [];
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('token', token);
    if (token) {
      const [email, password] = atob(token).split(':');
      try {
        const loggedInUser = users.find(user => user.email === email && user.password === password);
        if (loggedInUser) {
          setUser(loggedInUser);
        }
      } catch (e) {
        console.error('Invalid token:', e);
        localStorage.removeItem('token');
      }
    }
    }, [users]);

  const login = (email: string, password: string) => {
    const loggedInUser = users.find(user => user.email === email && user.password === password);
    if (loggedInUser) {
      localStorage.setItem('token', btoa(`${email}:${password}`));
      setUser(loggedInUser);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
