import { createContext, useState, useEffect, useContext } from 'react';
import auth from '../lib/auth';
import { apiRequest } from '@/lib/queryClient';

// Define the User type
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Define the context state
interface AuthContextState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
}

// Define the registration data type
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Create the context with default values
const AuthContext = createContext<AuthContextState>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Create the context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if the user is already authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (auth.isAuthenticated()) {
          const response = await apiRequest('GET', '/api/user/profile', null);
          setUser(response.user);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // If there is an error, clear the token
        auth.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    try {
      const result = await auth.login({ email, password });
      
      if (result.success) {
        setUser(result.user);
        return true;
      } else {
        setError(result.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred during login');
      return false;
    }
  };

  // Register function
  const register = async (userData: RegisterData): Promise<boolean> => {
    setError(null);
    try {
      const result = await auth.register(userData);
      
      if (result.success) {
        setUser(result.user);
        return true;
      } else {
        setError(result.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred during registration');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    auth.logout();
    setUser(null);
  };

  // Provide the context values
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook for easy usage of the context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
