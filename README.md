# File Structure

├── src/ # Main source code
│ ├── components/ # Reusable UI components
│ │ ├── layout/ # Layout components
│ │ ├── profile/ # Profile-specific components
│ │ ├── tweets/ # Tweet components
│ │ └── auth/ # Auth components
│ ├── contexts/ # Context providers
│ ├── pages/ # Full page components
│ ├── styles/ # CSS files
│ ├── assets/ # Images and media
│ ├── utils/ # Utility functions
│ ├── mockData.js # Mock data for development
│ ├── App.jsx # Main App component
│ ├── index.css # Global styles
│ └── main.jsx # Entry point
├── public/ # Static assets
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

# Twitter Clone - Profile Section

A React-based Twitter clone focusing on the user profile page functionality. This project demonstrates a modern React implementation with theme switching capabilities, component-based architecture, and mock data integration.

![Twitter Clone Preview](https://placehold.co/600x400?text=Twitter+Clone+Preview)

## Features

- **Profile Display**: View user profiles with cover photos, avatar, bio, and follower stats
- **Tweet Display**: Show user tweets with interactive like and retweet functionality
- **Tab Navigation**: Filter tweets by categories (tweets, replies, media, likes)
- **Theme Support**: Toggle between light and dark mode with persistent settings
- **Responsive Design**: Optimized for various screen sizes
- **Profile Editing**: Edit profile information via modal interface

## Technologies Used

- **Frontend**:

  - React 18 with Hooks
  - React Router for navigation
  - CSS Variables for theming
  - React Context API for state management

- **Development**:
  - Vite for fast development and building
  - Mock data for development without backend dependency

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository

   ```bash
   git clone [repository-url]
   cd Twitter2-Frontend/Profile
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## Project Structure

- `/src` - Main source code directory
  - `/components` - Reusable UI components
    - `Tweet.jsx` - Individual tweet display component
    - `ProfileHeader.jsx` - User profile header with cover photo and info
    - `ProfileTabs.jsx` - Navigation tabs for different tweet categories
    - `ProfileEditModal.jsx` - Modal for editing user profile
    - `ThemeToggle.jsx` - Theme switching component
  - `/contexts` - React context definitions
    - `ThemeContext.jsx` - Theme management context
  - `/pages` - Full page components
    - `ProfilePage.jsx` - Main profile page implementation
  - `/styles` - CSS styling files
  - `mockData.js` - Mock data for development
  - `App.jsx` - Main application component

## Component Details

### Theme System

The app implements a complete theme system with:

- Light and dark mode support
- System preference detection
- Persistent theme settings using localStorage
- Smooth transitions between themes

### Tweet Component

The Tweet component handles:

- Displaying tweet content and media
- Like and retweet functionality with state management
- User avatar and name display
- Timestamp information

### Profile Page

The Profile page includes:

- User information display
- Tab-based navigation for tweet filtering
- Profile editing functionality
- Responsive layout

## Backend Integration

This repository contains only the frontend of the Twitter clone. The backend is maintained in a separate repository. To connect this frontend to the backend:

1. Clone the backend repository
2. Follow the setup instructions in the backend README
3. Update the API endpoints in this project to point to your backend server

## Future Enhancements

- Tweet creation functionality
- Follow/unfollow functionality
- Notification system
- Direct messaging
- Search functionality

## License

This project is licensed under the MIT License - see the LICENSE file for details.
