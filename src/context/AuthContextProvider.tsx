// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import axios from "axios";

// Types
interface UserType {
  username: string;
  email: string;
  refreshToken:string;
  // Add any other user properties you want to store
}

interface AuthContextType {
  user: UserType | null;
  login: (username : string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v0/user',
  withCredentials: true, // Important for sending and receiving cookies
});

// AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function
  async function login(username: string, password: string): Promise<boolean> {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      const data = response.data;
  
      if (data.statusCode === 200) {
        const userData: UserType = {
          username: data.data.user.username,
          email: data.data.user.email,

          refreshToken:data.data.user.refreshToken,

        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
  
  

  // Logout function
  const logout = useCallback(async () => {
    try {
      await axiosInstance.post('/logout');
      setUser(null);
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  // Authentication status
  const isAuthenticated = !!user;

  // Context value
  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Axios interceptor for token refreshing
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await axiosInstance.post('/refreshtoken');
        if (res.data.statusCode === 200) {
          // Cookies are automatically handled by the browser
          return axiosInstance(originalRequest);
        } else {
          // Handle unsuccessful token refresh
          console.error('Token refresh failed:', res.data.message);
          // You might want to logout the user here
          // await logout();
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // You might want to logout the user here
        // await logout();
      }
    }
    return Promise.reject(error);
  }
);

export { axiosInstance };