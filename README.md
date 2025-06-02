# Twitter Clone

![Twitter Clone Logo](frontend/src/assets/twitter-logo.svg)

A modern, responsive Twitter clone built with the MERN stack (MongoDB, Express, React, and Node.js). This project replicates core Twitter functionality including user authentication, tweets, comments, likes, user profiles, and following/follower relationships.

## Features

- 🔐 **User Authentication** - Register, login, and secure routes
- 📝 **Tweet Functionality** - Create, read, update, and delete tweets
- 💬 **Comments** - Add and manage comments on tweets
- ❤️ **Interactions** - Like tweets and comments
- 👥 **User Profiles** - Customizable profiles with avatars and cover photos
- 🔍 **Search** - Find tweets by content or hashtags
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🌓 **Theme Toggle** - Switch between light and dark mode

## Tech Stack

### Frontend

- React (with React Router for navigation)
- CSS for styling (custom styling with CSS variables for theming)
- React Icons
- Context API for state management

### Backend

- Node.js and Express
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads

## Screenshots

_Coming soon_

## Installation and Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas connection)

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example.txt`:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/users` - Register a new user
- `POST /api/users/login` - Login a user

### Tweets

- `GET /api/tweets` - Get all tweets
- `POST /api/tweets` - Create a new tweet
- `GET /api/tweets/:id` - Get a specific tweet
- `DELETE /api/tweets/:id` - Delete a tweet
- `POST /api/tweets/:id/like` - Like a tweet
- `POST /api/tweets/:id/unlike` - Unlike a tweet

### Comments

- `GET /api/tweets/:id/comments` - Get all comments for a tweet
- `POST /api/tweets/:id/comments` - Add a comment to a tweet
- `DELETE /api/tweets/:id/comments/:commentId` - Delete a comment
- `POST /api/tweets/:id/comments/:commentId/like` - Like a comment

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update user profile
- `POST /api/users/:id/follow` - Follow a user
- `POST /api/users/:id/unfollow` - Unfollow a user

## Project Structure

```
/
├── frontend/                # Frontend React application
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # React components
│   │   ├── styles/          # CSS files
│   │   └── main.jsx         # Entry point
│   └── index.html           # HTML template
│
└── backend/                 # Backend Node.js application
    ├── controllers/         # Route controllers
    ├── middleware/          # Custom middleware
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    └── server.js            # Entry point
```

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Design inspiration from Twitter/X
- Icons from React Icons
- Profile image placeholders from [Placeholder.com](https://placeholder.com)
