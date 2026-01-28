# 📱 Video Streaming App - Mobile Frontend

A beautiful, secure React Native mobile application for video streaming. Features smooth navigation, JWT authentication, and seamless video playback powered by YouTube's iFrame API.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the App](#running-the-app)
- [App Architecture](#app-architecture)
- [User Flow](#user-flow)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Design System](#design-system)
- [Troubleshooting](#troubleshooting)
- [Building for Production](#building-for-production)

---

## 🎯 Overview

This mobile application provides a complete video streaming experience with:

- **Thin Client Architecture**: Zero business logic in frontend - all handled by backend API
- **Secure Authentication**: JWT-based authentication with automatic token management
- **Smooth Navigation**: Stack navigation with proper authentication flow
- **Video Playback**: YouTube videos using react-native-youtube-iframe
- **Professional UI**: Clean, modern design with smooth animations
- **Offline Support**: JWT token persists across app restarts

**Key Design Principle**: The frontend is a "thin client" - it only renders UI and makes API calls. All validation, logic, and data control happens in the backend.

---

## 📸 Screenshots

### How to Add Screenshots

**1. Take Screenshots on Your Phone:**

Open the app on your phone and take screenshots of:
- Login Screen
- Signup Screen
- Dashboard with videos
- Video Player playing a video
- Settings Screen

**2. Transfer Screenshots to Computer:**

- **iPhone**: AirDrop to Mac or email to yourself
- **Android**: Connect via USB or use Google Photos

**3. Create Screenshots Folder:**

```bash
# In your frontend repo
mkdir -p screenshots

# Move your images there
# Rename them clearly:
# - 01-login.png
# - 02-signup.png
# - 03-dashboard.png
# - 04-video-player.png
# - 05-settings.png
```

**4. Add to README:**

Replace the placeholder images below with your actual screenshots:

```markdown
### App Screens

<div align="center">

#### Login Screen
<img src="./screenshots/01-login.png" width="300" alt="Login Screen">

Clean, simple login with email and password fields.

#### Dashboard
<img src="./screenshots/03-dashboard.png" width="300" alt="Dashboard">

Shows 2 video tiles with thumbnails and descriptions. Pull to refresh.

#### Video Player
<img src="./screenshots/04-video-player.png" width="300" alt="Video Player">

Full-screen video player with controls. Dark theme for better viewing.

#### Settings
<img src="./screenshots/05-settings.png" width="300" alt="Settings Screen">

User profile with name, email, and logout option.

</div>
```

**5. Commit Screenshots:**

```bash
git add screenshots/
git commit -m "docs: Add app screenshots"
git push
```

---

### Current Screenshots

*Screenshots coming soon - follow the guide above to add yours!*

---

## ✨ Features

### Authentication

- ✅ **Signup**: Create account with name, email, and password
- ✅ **Login**: Secure authentication with JWT tokens
- ✅ **Auto-logout**: Automatic logout on token expiry (401 errors)
- ✅ **Persistent Login**: Token saved in AsyncStorage, survives app restarts
- ✅ **Profile View**: See your account details
- ✅ **Logout**: Clear session and return to login

### Video Streaming

- ✅ **Dashboard**: Shows 2 curated videos with thumbnails and descriptions
- ✅ **Pull to Refresh**: Refresh video list
- ✅ **Video Playback**: Plays YouTube videos using official iFrame API
- ✅ **Video Controls**: Play, pause, seek, volume, fullscreen
- ✅ **Clean UI**: No YouTube branding, seamless experience
- ✅ **Error Handling**: Graceful error messages if video fails to load

### User Experience

- ✅ **Smooth Navigation**: Stack navigation between screens
- ✅ **Loading States**: Spinners while loading data
- ✅ **Error Messages**: User-friendly error alerts
- ✅ **Professional Design**: Modern UI with shadows and smooth animations
- ✅ **Dark Theme**: Video player uses dark theme for better viewing
- ✅ **Responsive**: Works on all phone sizes

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React Native** | 0.81.5 | Mobile framework |
| **Expo** | ~54.0 | Development platform |
| **React Navigation** | 7.x | Screen navigation |
| **Axios** | 1.13.4 | API requests |
| **AsyncStorage** | 2.2.0 | Local data storage |
| **react-native-youtube-iframe** | 2.x | YouTube video playback |

### Why These Technologies?

**React Native:**
- Write once, run on iOS and Android
- Large community and ecosystem
- Fast development with hot reload
- Native performance

**Expo:**
- Easy setup, no Xcode/Android Studio needed
- Over-the-air updates
- Great developer experience
- Access to native APIs

**React Navigation:**
- Industry standard for navigation
- Smooth animations
- Easy to implement auth flow
- Great documentation

**react-native-youtube-iframe:**
- Official YouTube iFrame API
- No "Error 153" issues
- Full controls support
- Reliable and maintained

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16+ installed
- **npm** or **yarn**
- **Expo Go** app on your phone:
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
- Backend API running (see backend README)

---

### Installation

**1. Clone the repository**

```bash
git clone <your-frontend-repo-url>
cd frontend-repo
```

**2. Install dependencies**

```bash
npm install
```

**3. Verify installation**

```bash
npm list react-native-youtube-iframe
# Should show: react-native-youtube-iframe@2.x.x
```

---

### Configuration

**1. Get your computer's IP address**

The mobile app needs to connect to your backend API.

**Windows:**
```bash
ipconfig
# Look for "IPv4 Address" under your active network adapter
# Example: 192.168.1.100
```

**Mac:**
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example: inet 192.168.1.100
```

**Linux:**
```bash
hostname -I
# Example: 192.168.1.100
```

**2. Update API configuration**

Edit `src/services/api.js`:

```javascript
// BEFORE (won't work from phone):
const API_BASE_URL = 'http://localhost:5000';

// AFTER (use your computer's IP):
const API_BASE_URL = 'http://192.168.1.100:5000';
//                           ^^^^^^^^^^^^^^^^
//                           Your computer's IP address
```

**Important:** 
- Make sure your phone and computer are on the same WiFi network
- Use your actual IP address, not `localhost`
- Backend must be running on port 5000

**3. Verify backend is accessible**

Open on your phone's browser:
```
http://192.168.1.100:5000
```

You should see:
```json
{
  "message": "Video App API",
  "status": "running",
  "version": "1.0.0"
}
```

---

### Running the App

**1. Start Expo**

```bash
npm start
```

This will:
- Start Metro bundler
- Display a QR code in terminal
- Open Expo DevTools in browser

**2. Open on your phone**

**iOS:**
- Open Camera app
- Point at QR code
- Tap notification to open in Expo Go

**Android:**
- Open Expo Go app
- Tap "Scan QR Code"
- Point at QR code

**3. Wait for app to load**

First load takes 30-60 seconds. Subsequent loads are faster.

**4. Test the app**

- You should see the Login screen
- Try creating an account (Signup)
- Login with your credentials
- Browse videos on Dashboard
- Tap a video to watch it
- Check Settings to see your profile

---

## 🏗️ App Architecture

### Component Hierarchy

```
App.js (Root)
│
├─ NavigationContainer
│  │
│  ├─ AuthStack (if not logged in)
│  │  ├─ LoginScreen
│  │  └─ SignupScreen
│  │
│  └─ MainStack (if logged in)
│     ├─ DashboardScreen
│     │  └─ VideoTile (component) × 2
│     ├─ VideoPlayerScreen
│     │  └─ YoutubePlayer (component)
│     └─ SettingsScreen
│
├─ Services
│  ├─ api.js (Axios instance + interceptors)
│  └─ auth.js (Auth functions)
│
└─ Utils
   └─ storage.js (AsyncStorage helpers)
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     USER INTERACTION                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    REACT COMPONENT                           │
│  - User taps button                                         │
│  - Component calls API function                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    API CLIENT (axios)                        │
│  - Adds JWT token to headers                                │
│  - Makes HTTP request                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND API                               │
│  - Validates request                                        │
│  - Processes business logic                                 │
│  - Returns response                                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    AXIOS INTERCEPTOR                         │
│  - Receives response                                        │
│  - If 401, triggers auto-logout                             │
│  - Returns data to component                                │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    REACT COMPONENT                           │
│  - Updates state with data                                  │
│  - Re-renders UI                                            │
│  - User sees result                                         │
└─────────────────────────────────────────────────────────────┘
```

### Authentication Flow

```
┌──────────────┐
│  App Launch  │
└──────┬───────┘
       │
       ↓
┌──────────────────────┐
│ Check AsyncStorage   │
│ for JWT token        │
└──────┬───────────────┘
       │
       ├─────── Token exists ──────────┐
       │                               │
       │                               ↓
       │                     ┌──────────────────┐
       │                     │ Show MainStack   │
       │                     │ (Dashboard)      │
       │                     └──────────────────┘
       │
       └─── No token ────────┐
                             │
                             ↓
                   ┌──────────────────┐
                   │ Show AuthStack   │
                   │ (Login/Signup)   │
                   └──────────────────┘
```

---

## 👤 User Flow

### Complete User Journey

**1. First Launch**

```
User opens app
   ↓
App checks AsyncStorage for token
   ↓
No token found
   ↓
Shows Login Screen
```

**2. Signup**

```
User taps "Sign Up"
   ↓
Shows Signup Screen
   ↓
User enters: Name, Email, Password
   ↓
Taps "Sign Up" button
   ↓
POST /auth/signup to backend
   ↓
Backend creates user
   ↓
Success message shown
   ↓
Navigate back to Login Screen
```

**3. Login**

```
User enters: Email, Password
   ↓
Taps "Login" button
   ↓
POST /auth/login to backend
   ↓
Backend verifies credentials
   ↓
Backend returns JWT token + user data
   ↓
Save token to AsyncStorage
   ↓
Save user data to AsyncStorage
   ↓
Navigation switches to MainStack
   ↓
Shows Dashboard
```

**4. Browse Videos**

```
Dashboard loads
   ↓
GET /dashboard (with JWT in header)
   ↓
Backend returns 2 videos with playback_tokens
   ↓
Shows 2 VideoTile components
   ↓
User can pull-to-refresh to reload
```

**5. Watch Video**

```
User taps VideoTile
   ↓
Navigate to VideoPlayerScreen
   ↓
GET /video/{id}/stream?token={playback_token} (with JWT)
   ↓
Backend verifies both tokens
   ↓
Backend returns YouTube embed URL
   ↓
Extract youtube_id from URL
   ↓
Pass ID to YoutubePlayer component
   ↓
Video plays with full controls
```

**6. View Settings**

```
User taps Settings icon (⚙️)
   ↓
Shows SettingsScreen
   ↓
Load user data from AsyncStorage
   ↓
Display name and email
```

**7. Logout**

```
User taps "Logout" button
   ↓
Confirmation dialog shown
   ↓
User confirms
   ↓
POST /auth/logout (with JWT)
   ↓
Clear AsyncStorage (token + user data)
   ↓
Navigation switches to AuthStack
   ↓
Shows Login Screen
```

**8. Automatic Logout**

```
JWT token expires (24 hours)
   ↓
User makes any API request
   ↓
Backend returns 401 Unauthorized
   ↓
Axios interceptor catches 401
   ↓
Automatically clears AsyncStorage
   ↓
User sees Login Screen
```

---

## 📁 Project Structure

```
frontend-repo/
│
├── App.js                      # Root component
│   ├── Manages auth state
│   ├── Checks for JWT token
│   └── Shows AuthStack or MainStack
│
├── src/
│   │
│   ├── components/
│   │   └── VideoTile.js        # Reusable video card component
│   │       ├── Thumbnail display
│   │       ├── Play button overlay
│   │       ├── Title and description
│   │       └── Tap handler
│   │
│   ├── screens/
│   │   │
│   │   ├── LoginScreen.js      # Login form
│   │   │   ├── Email input
│   │   │   ├── Password input
│   │   │   ├── Login button
│   │   │   └── Link to Signup
│   │   │
│   │   ├── SignupScreen.js     # Signup form
│   │   │   ├── Name input
│   │   │   ├── Email input
│   │   │   ├── Password input
│   │   │   ├── Signup button
│   │   │   └── Link to Login
│   │   │
│   │   ├── DashboardScreen.js  # Main screen
│   │   │   ├── Header with title
│   │   │   ├── Settings button
│   │   │   ├── FlatList of VideoTiles
│   │   │   └── Pull-to-refresh
│   │   │
│   │   ├── VideoPlayerScreen.js # Video player
│   │   │   ├── Back button
│   │   │   ├── YoutubePlayer component
│   │   │   ├── Video info card
│   │   │   └── Error handling
│   │   │
│   │   └── SettingsScreen.js   # Settings/Profile
│   │       ├── Back button
│   │       ├── User profile card
│   │       └── Logout button
│   │
│   ├── services/
│   │   │
│   │   ├── api.js               # Axios configuration
│   │   │   ├── Base URL setup
│   │   │   ├── Request interceptor (adds JWT)
│   │   │   └── Response interceptor (handles 401)
│   │   │
│   │   └── auth.js              # Auth functions
│   │       ├── signup()
│   │       ├── login()
│   │       ├── logout()
│   │       └── getProfile()
│   │
│   └── utils/
│       │
│       └── storage.js           # AsyncStorage helpers
│           ├── saveAuthToken()
│           ├── getAuthToken()
│           ├── removeAuthToken()
│           ├── saveUserData()
│           ├── getUserData()
│           └── isLoggedIn()
│
├── package.json                # Dependencies
├── app.json                    # Expo configuration
└── README.md                   # This file
```

---

## 🔌 API Integration

### Axios Configuration

**File: `src/services/api.js`**

```javascript
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Backend API URL (use your computer's IP)
const API_BASE_URL = 'http://192.168.1.100:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor - Adds JWT to every request
api.interceptors.request.use(
  async (config) => {
    // Get token from storage
    const token = await AsyncStorage.getItem('authToken');
    
    // If token exists, add to header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle 401 errors (auto-logout)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // If 401 (unauthorized), token expired
    if (error.response?.status === 401) {
      // Clear token from storage
      await AsyncStorage.removeItem('authToken');
      // User will be automatically redirected to login
    }
    
    return Promise.reject(error);
  }
);

export default api;
```

**How It Works:**

1. **Request Interceptor**:
   - Before every API call, reads JWT token from AsyncStorage
   - Adds token to `Authorization` header
   - Backend receives token and verifies it

2. **Response Interceptor**:
   - After every API response, checks for 401 status
   - If 401 (token expired), clears token from storage
   - App.js detects no token and shows Login screen

3. **Timeout**:
   - 10 second timeout prevents hanging requests
   - Shows error if network is slow

---

### Authentication Service

**File: `src/services/auth.js`**

```javascript
import api from './api';
import { saveAuthToken, saveUserData, removeAuthToken } from '../utils/storage';

// Signup function
export const signup = async (name, email, password) => {
  try {
    const response = await api.post('/auth/signup', {
      name,
      email,
      password,
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.error || 'Signup failed' 
    };
  }
};

// Login function
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
    
    return { success: true, user };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data?.error || 'Login failed' 
    };
  }
};

// Logout function
export const logout = async () => {
  try {
    await api.post('/auth/logout');
    await removeAuthToken();
    return { success: true };
  } catch (error) {
    // Still clear local data even if backend call fails
    await removeAuthToken();
    return { success: true };
  }
};
```

---

## 🎨 Design System

### Colors

```javascript
// Primary Colors
PRIMARY_BLUE: '#007AFF'      // Buttons, links, accents
BACKGROUND: '#f8f9fa'        // App background (light gray)
CARD_BG: '#ffffff'           // Cards, tiles (white)

// Text Colors
TEXT_PRIMARY: '#1a1a1a'      // Main text (almost black)
TEXT_SECONDARY: '#666666'    // Secondary text (medium gray)
TEXT_TERTIARY: '#999999'     // Tertiary text (light gray)

// Video Player
PLAYER_BG: '#000000'         // Black background
OVERLAY: 'rgba(0, 0, 0, 0.2)' // Semi-transparent overlay

// States
ERROR: '#FF3B30'             // Error messages, logout button
SUCCESS: '#34C759'           // Success messages
```

### Typography

```javascript
// Font Sizes
TITLE_LARGE: 32px            // Screen titles
TITLE_MEDIUM: 20px           // Card titles
TITLE_SMALL: 18px            // Video titles
BODY: 16px                   // Body text
BODY_SMALL: 14px             // Secondary body text
CAPTION: 12px                // Captions, labels

// Font Weights
BOLD: '700'                  // Titles, important text
SEMIBOLD: '600'              // Subtitles
MEDIUM: '500'                // Secondary text
REGULAR: '400'               // Body text
```

### Spacing

```javascript
// Screen Padding
SCREEN_HORIZONTAL: 20px      // Left/right padding
SCREEN_VERTICAL: 16px        // Top/bottom padding

// Card Spacing
CARD_MARGIN: 16px            // Between cards
CARD_PADDING: 16px           // Inside cards

// Button Spacing
BUTTON_PADDING_V: 15px       // Vertical padding
BUTTON_PADDING_H: 30px       // Horizontal padding
```

### Shadows (Elevation)

```javascript
// iOS
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.15,
shadowRadius: 8,

// Android
elevation: 3,
```

### Border Radius

```javascript
CARD: 12px                   // Cards, tiles
BUTTON: 10px                 // Buttons
CIRCULAR: 50%                // Settings button, play button
```

---

## 🐛 Troubleshooting

### App Won't Connect to Backend

**Problem:** "Network request failed" errors.

**Solutions:**

1. **Check backend is running:**
```bash
# Test from your computer's browser:
http://localhost:5000/
```

2. **Check IP address is correct:**
```javascript
// In src/services/api.js
const API_BASE_URL = 'http://YOUR_ACTUAL_IP:5000';
// NOT localhost!
```

3. **Check same WiFi network:**
- Phone and computer must be on same WiFi
- Corporate/school WiFi might block connections
- Try mobile hotspot

4. **Test from phone's browser:**
```
http://YOUR_COMPUTER_IP:5000/
```
Should show API response.

5. **Check firewall:**
- Windows Firewall might block port 5000
- Temporarily disable to test

---

### "Error 153" When Playing Videos

**Problem:** YouTube videos won't play.

**Solution:**

Verify you're using `react-native-youtube-iframe`:

```bash
npm list react-native-youtube-iframe
# Should show: react-native-youtube-iframe@2.x.x
```

If not installed:
```bash
npm install react-native-youtube-iframe
```

Make sure `VideoPlayerScreen.js` uses:
```javascript
import YoutubePlayer from 'react-native-youtube-iframe';
```

---

### App Crashes on Android

**Problem:** App crashes when opening video player.

**Solution:**

Add to `VideoPlayerScreen.js`:
```javascript
<YoutubePlayer
  videoId={youtubeId}
  webViewProps={{
    androidLayerType: 'hardware',  // Add this
  }}
/>
```

---

### Expo Go Shows "Something went wrong"

**Problem:** Expo Go shows error screen.

**Solutions:**

1. **Clear Metro bundler cache:**
```bash
npm start -- --clear
```

2. **Reinstall dependencies:**
```bash
rm -rf node_modules
npm install
```

3. **Check for syntax errors:**
Look at Metro bundler logs in terminal.

---

### Login Works But Dashboard Shows Loading Forever

**Problem:** Dashboard stuck on loading spinner.

**Solutions:**

1. **Check backend logs:**
```bash
# If using Docker:
docker-compose logs backend

# Look for dashboard endpoint errors
```

2. **Check JWT token:**
```javascript
// Add debug logging in DashboardScreen.js
console.log('Fetching videos...');
const response = await api.get('/dashboard');
console.log('Response:', response.data);
```

3. **Verify backend has videos:**
```bash
# If using Docker:
docker-compose exec mongodb mongosh video_app

# Then:
db.videos.countDocuments()
# Should return: 2
```

---

## 📦 Building for Production

### Create APK (Android)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### Create IPA (iOS)

```bash
# Requires Apple Developer account ($99/year)

# Build for TestFlight
eas build --platform ios --profile production
```

### Over-the-Air Updates

```bash
# Publish update (no app store submission needed)
eas update --branch production --message "Bug fixes"
```

---

## 📚 Additional Resources

- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-youtube-iframe](https://github.com/LonelyCpp/react-native-youtube-iframe)
- [AsyncStorage Documentation](https://react-native-async-storage.github.io/async-storage/)

---

## 🤝 Contributing

This app was built as part of a technical assignment to demonstrate:
- React Native mobile development
- API integration
- JWT authentication
- Navigation patterns
- Clean code organization
- Professional UI/UX design

---

## 📄 License

This project is for educational and demonstration purposes.

---

## 👤 Author

**Your Name**
- GitHub: [Sworship](https://github.com/Swordship)
- LinkedIn: [Monish S](https://www.linkedin.com/in/monish-s-a37482274)

---

## 🎯 Assignment Checklist

This frontend meets all assignment requirements:

- ✅ React Native mobile app
- ✅ Thin client (zero business logic)
- ✅ JWT authentication flow
- ✅ Signup and Login screens
- ✅ Dashboard showing 2 videos
- ✅ Video playback with controls
- ✅ Settings screen with profile
- ✅ Logout functionality
- ✅ Professional UI design
- ✅ Proper navigation
- ✅ Error handling
- ✅ Loading states

---

**Mobile app is polished and production-ready!** 🎉

---

## 📝 How to Add Your Screenshots

1. **Take screenshots on your phone** of all screens
2. **Create screenshots folder** in repo root
3. **Add images** to folder with clear names
4. **Update this README** with actual screenshot paths
5. **Commit and push** to GitHub

**GitHub will automatically display the images!**