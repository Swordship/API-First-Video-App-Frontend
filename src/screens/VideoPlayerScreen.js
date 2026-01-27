import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import api from '../services/api';

export default function VideoPlayerScreen({ route, navigation }) {
  const { video } = route.params;
  
  const [youtubeId, setYoutubeId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);

  // Fetch stream URL and extract YouTube ID
  const fetchStreamUrl = async () => {
    try {
      console.log('Fetching stream URL for video:', video.id);
      
      const response = await api.get(
        `/video/${video.id}/stream?token=${video.playback_token}`
      );
      
      const streamUrl = response.data.stream_url;
      console.log('Stream URL received:', streamUrl);
      
      // Extract YouTube ID from URL
      // Format: https://www.youtube-nocookie.com/embed/aqz-KE-bpKQ?...
      const id = streamUrl.split('/embed/')[1]?.split('?')[0];
      
      if (id) {
        setYoutubeId(id);
        console.log('YouTube ID extracted:', id);
      } else {
        throw new Error('Could not extract YouTube ID');
      }
      
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

  // Open in YouTube app as fallback
  const openInYouTube = () => {
    if (youtubeId) {
      Linking.openURL(`https://www.youtube.com/watch?v=${youtubeId}`)
        .catch(() => {
          Alert.alert('Error', 'Could not open YouTube app');
        });
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

      {/* Content */}
      {youtubeId ? (
        <ScrollView style={styles.scrollView}>
          {/* YouTube Player */}
          <View style={styles.playerWrapper}>
            <YoutubePlayer
              height={250}
              play={playing}
              videoId={youtubeId}
              onChangeState={(state) => {
                console.log('Player state:', state);
              }}
              onReady={() => {
                console.log('YouTube player ready');
              }}
              onError={(error) => {
                console.error('YouTube player error:', error);
                Alert.alert('Error', 'Failed to load video. Try the YouTube app button below.');
              }}
              webViewProps={{
                androidLayerType: 'hardware',
              }}
            />
          </View>
          
          {/* Video Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.videoTitle}>{video.title}</Text>
            <Text style={styles.description}>{video.description}</Text>
          </View>
          
          {/* Fallback Button */}
          <TouchableOpacity
            style={styles.fallbackButton}
            onPress={openInYouTube}
          >
            <Text style={styles.fallbackButtonText}>
              Open in YouTube App 📺
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load video</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={fetchStreamUrl}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
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
    paddingTop: 50,
    backgroundColor: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  scrollView: {
    flex: 1,
  },
  playerWrapper: {
    backgroundColor: '#000',
    paddingTop: 10,
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    lineHeight: 20,
  },
  fallbackButton: {
    margin: 20,
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  fallbackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    minWidth: 120,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});