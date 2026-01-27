import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getUserData } from '../utils/storage';
import { logout } from '../services/auth';

export default function SettingsScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  // Load user data from storage
  useEffect(() => {
    const loadUserData = async () => {
      const userData = await getUserData();
      setUser(userData);
      setLoading(false);
    };
    
    loadUserData();
  }, []);

  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setLoggingOut(true);
            await logout();
            setLoggingOut(false);
            
            // Navigation will be handled automatically by App.js
            // when token is cleared
            console.log('Logged out successfully');
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.profileItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.name || 'N/A'}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.profileItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.logoutButtonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
    width: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 60, // Balance the back button
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  profileItem: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});