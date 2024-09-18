import React, { createContext, useContext, useState, ReactNode } from "react";


// the type for User
interface UserType {
  username: string;
  email: string;
  refreshToken: string;
  accessToken: string;
}

// the context type
interface AuthContextType {
  user: UserType | {};
  setUser: React.Dispatch<React.SetStateAction<UserType | {}>>;
}

// AuthContext with default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<UserType | {}>({});

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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

export default AuthContextProvider;
