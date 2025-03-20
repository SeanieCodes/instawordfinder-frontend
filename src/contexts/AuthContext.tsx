import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthState, LoginCredentials, RegisterCredentials } from '../types/auth.types';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<any>;
  register: (credentials: RegisterCredentials) => Promise<any>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  
  return context;
};