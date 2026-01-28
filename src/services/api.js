import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend URL - CHANGE THIS to your computer's IP
// Find your IP: ipconfig (Windows) or ifconfig (Mac/Linux)
const API_BASE_URL = 'http://10.82.145.194:5000';  // ← Your Flask server IP from logs

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Add JWT token to every request
api.interceptors.request.use(
  async (config) => {
    try {
      // Get token from storage
      const token = await AsyncStorage.getItem('authToken');
      
      // If token exists, add to Authorization header
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
      return config;
    } catch (error) {
      console.error('Error adding token to request:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`);
    return response;
  },
  async (error) => {
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url} - ${error.response?.status}`);
    
    // If 401 (unauthorized), token might be expired
    if (error.response?.status === 401) {
      // Clear token and redirect to login (handled in screens)
      await AsyncStorage.removeItem('authToken');
    }
    
    return Promise.reject(error);
  }
);

export default api;