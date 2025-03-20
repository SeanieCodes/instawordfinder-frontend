export interface User {
    id: string;
    username: string;
    email: string;
}

export type EnsureUserIsUsed = User;
  
export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}
  
export interface LoginCredentials {
    email: string;
    password: string;
}
  
export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
  
export interface AuthResponse {
    user: User;
    token: string;
}