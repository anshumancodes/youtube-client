import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContextProvider'; // Assuming AuthContext exists

//the UserProfile type
interface UserProfile {
  avatar: string;
  name: string;
  email: string;
  username: string;
  coverImage: string;
}

// the context data structure
interface UserProfileContextProps {
  profile: UserProfile | null;
  error: string | null;
  loading: boolean;
  refreshProfile: () => void; // Function to manually refresh the profile
}

const UserProfileContext = createContext<UserProfileContextProps | undefined>(undefined);

// Custom hook to use the context easily
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

interface UserProfileProviderProps {
    profile:any;
    loading:any;
    error:any;
    children:any;
}

// Context provider component
export const UserProfileProvider:React.FC<UserProfileProviderProps> = ({children}) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAuth(); // Get token from AuthContext

  const fetchUser = async () => {
    setLoading(true); // Show loading while fetching
    try {
      const response = await axios.get("http://localhost:8000/api/v0/user/get-user", {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      });
      setProfile(response.data.data); // Assuming your API returns profile under data.data
      setError(null); // Clear any previous errors
    } catch (error: any) {
      console.error('Error fetching user profile:', error.response ? error.response.data : error);
      setError('Failed to load user profile. Please try again later.');
      setProfile(null);
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser(); // Fetch user profile when token changes or is available
    }
  }, [token]);

  return (
    <UserProfileContext.Provider value={{ profile, error, loading, refreshProfile: fetchUser }}>
      {children}
    </UserProfileContext.Provider>
  );
};
