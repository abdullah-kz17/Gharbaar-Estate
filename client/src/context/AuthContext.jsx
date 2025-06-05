import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import {axiosPrivate} from "../utils/axiosInstance.js";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);  

  // Store token in localStorage and update state
  const storeTokenInLS = (token) => {
    setToken(token);
    localStorage.setItem("token", token);  
  };

  // Check if user is logged in
  const isLoggedIn = !!token;

  const authenticationToken = token ? `Bearer ${token}` : null;

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem("token");

    // Reset auth states
    setToken(null);
    setUser(null);

    window.location.href = "/login";
  }

  // Get current user data
  const getCurrentUserData = async () => {
    if (!authenticationToken) return;

    try {
      const response = await axiosPrivate.get("/auth/me", {
        headers: {
          "Authorization": authenticationToken,
        },
      });
      setUser(response.data.user); // Assuming response.data contains user data in `user` field
      console.log(response.data.user)
    } catch (error) {
      console.log("Error getting user data:", error.message);
      setUser(null); 
    } finally {
      setLoading(false);  
    }
  };

  useEffect(() => {
    if (token) {
      getCurrentUserData();  // Fetch current user when token is available
    } else {
      setLoading(false);  // No need to fetch user data if there's no token
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        storeTokenInLS,
        isLoggedIn,
        loading,
        setToken, 
        setUser,  
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the AuthContext in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
