import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for AsyncStorage
const KEYS = {
  AUTH_TOKEN: 'authToken',
  USER_DATA: 'userData',
};

// Save auth token
export const saveAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem(KEYS.AUTH_TOKEN, token);
    console.log('✅ Token saved');
  } catch (error) {
    console.error('Error saving token:', error);
    throw error;
  }
};

// Get auth token
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem(KEYS.AUTH_TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

// Remove auth token (logout)
export const removeAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.AUTH_TOKEN);
    await AsyncStorage.removeItem(KEYS.USER_DATA);
    console.log('✅ Token removed');
  } catch (error) {
    console.error('Error removing token:', error);
    throw error;
  }
};

// Save user data
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
    console.log('✅ User data saved');
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_DATA);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Check if user is logged in
export const isLoggedIn = async () => {
  const token = await getAuthToken();
  return !!token; // Returns true if token exists
};