import api from './api';
import { saveAuthToken, saveUserData, removeAuthToken } from '../utils/storage';

/**
 * Signup - Register new user
 */
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', {
      name,
      email,
      password,
    });
    
    console.log('Signup successful:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Signup error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Signup failed. Please try again.' 
    };
  }
};

/**
 * Login - Authenticate user and save token
 */
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    
    const { token, user } = response.data;
    
    // Save token and user data
    await saveAuthToken(token);
    await saveUserData(user);
    
    console.log('Login successful:', user);
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Login failed. Please check your credentials.' 
    };
  }
};

/**
 * Logout - Clear token and user data
 */
export const logout = async () => {
  try {
    // Call backend logout endpoint (optional - token is stateless)
    await api.post('/auth/logout');
    
    // Clear local storage
    await removeAuthToken();
    
    console.log('Logout successful');
    return { success: true };
  } catch (error) {
    // Even if backend call fails, still clear local data
    await removeAuthToken();
    console.error('Logout error:', error.response?.data || error.message);
    return { success: true }; // Still return success since local data is cleared
  }
};

/**
 * Get current user profile
 */
export const getProfile = async () => {
  try {
    const response = await api.get('/auth/me');
    
    console.log('Profile fetched:', response.data.user);
    return { success: true, user: response.data.user };
  } catch (error) {
    console.error('Get profile error:', error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.error || 'Failed to fetch profile.' 
    };
  }
};