import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function VideoTile({ video, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Thumbnail */}
      <Image
        source={{ uri: video.thumbnail_url }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      
      {/* Video Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {video.title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {video.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
  },
  info: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});