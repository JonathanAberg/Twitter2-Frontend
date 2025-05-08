import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // For development, create a mock user automatically
  const [currentUser, setCurrentUser] = useState({
    id: "dev123",
    name: "Development User",
    username: "devuser",
    email: "dev@example.com",
    profileImage: "https://placehold.co/200x200?text=Dev",
    password: "devpassword",
    // Add any other user properties your app needs
  });

  const [loading, setLoading] = useState(false);

  // Check localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // Here you would normally make an API call
    // For now, just store the user in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  // Register function
  const register = (userData) => {
    // Here you would normally make an API call
    // For now, just store the user in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
    setCurrentUser(userData);
    return true;
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
