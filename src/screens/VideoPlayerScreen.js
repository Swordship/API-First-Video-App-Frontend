import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import api from '../services/api';

export default function VideoPlayerScreen({ route, navigation }) {
  const { video } = route.params; // Get video passed from Dashboard
  
  const [streamUrl, setStreamUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch stream URL from backend
  const fetchStreamUrl = async () => {
    try {
      console.log('Fetching stream URL for video:', video.id);
      
      // Call backend with video_id and playback_token
      const response = await api.get(
        `/video/${video.id}/stream?token=${video.playback_token}`
      );
      
      setStreamUrl(response.data.stream_url);
      console.log('Stream URL received:', response.data.stream_url);
    } catch (error) {
      console.error('Error fetching stream:', error.response?.data || error.message);
      Alert.alert(
        'Error',
        'Failed to load video. Please try again.',
        [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStreamUrl();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading video...</Text>
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
        <Text style={styles.title} numberOfLines={1}>
          {video.title}
        </Text>
      </View>

      {/* Video Player */}
      {streamUrl ? (
        <WebView
          source={{ uri: streamUrl }}
          style={styles.webview}
          allowsFullscreenVideo={true}
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('WebView error:', nativeEvent);
            Alert.alert('Error', 'Failed to load video player.');
          }}
          onLoadStart={() => console.log('WebView loading...')}
          onLoadEnd={() => console.log('WebView loaded')}
        />
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load video</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50, // Account for status bar
    backgroundColor: '#000',
  },
  backButton: {
    fontSize: 18,
    color: '#007AFF',
    marginRight: 15,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#fff',
  },
});