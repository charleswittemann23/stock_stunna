import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("api/auth/protected");
      //console.log(res)
      // Handle different possible response formats
      let username = null;
      
      if (res.data.user?.username) {
        username = res.data.user.username;
      } 
      
      if (username) {
        setUser({ username });
        setIsAuthenticated(true);
      } else {
        throw new Error("No user identifier found in response");
      }
    } catch (err) {
      console.error("Authentication check failed:", err.response?.data || err.message);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      
      await axiosInstance.post("api/auth/token/", 
        { email, password }, 
        { withCredentials: true }
      );
      
      // Small delay to ensure cookies are set
      await new Promise(resolve => setTimeout(resolve, 100));
      await checkAuth();
      
      return true;
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout/", {}, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};