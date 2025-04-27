import api from './api';

// Interface for user registration
interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// Interface for login data
interface LoginData {
  email: string;
  password: string;
}

// Auth functions
const auth = {
  // Register a new user
  register: async (userData: RegisterData) => {
    try {
      const response = await api.post('/auth/signup', userData);
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  },
  
  // Login an existing user
  login: async (credentials: LoginData) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      
      return { success: true, user };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your credentials.' 
      };
    }
  },
  
  // Logout the current user
  logout: () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    return { success: true };
  },
  
  // Check if the user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },
  
  // Get current auth token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default auth;
