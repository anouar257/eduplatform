export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'guest' | 'student' | 'parent' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'parent' | 'teacher';
}

export interface AuthResponse {
  user: User;
  token?: string;
}
