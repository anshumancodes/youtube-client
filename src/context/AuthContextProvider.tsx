import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import axios, { AxiosInstance } from "axios";
import { useCookies } from "react-cookie";

interface UserType {
  username: string;
  email: string;
  refreshToken: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/v0/user',
  withCredentials: true
});

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);

  const initializeAuth = useCallback(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = cookies.accessToken || localStorage.getItem('token');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.post('/login', { username, password });
      const { data } = response;

      if (data.statusCode === 200) {
        const userData: UserType = {
          username: data.data.user.username,
          email: data.data.user.email,
          refreshToken: data.data.user.refreshToken,
        };
        setUser(userData);

        const accessToken = data.data.user.accessToken;
        setToken(accessToken);

        localStorage.setItem('user', JSON.stringify(userData));
        setCookie('accessToken', accessToken, { path: '/', secure: true, sameSite: 'strict' });
        localStorage.setItem('token', accessToken);

        return true;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await axiosInstance.post('/logout');
      if (response.data.statusCode === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        removeCookie('accessToken', { path: '/' });
        setUser(null);
        setToken(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = {
    user,
    token,
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { axiosInstance };