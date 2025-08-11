import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axiosInstance.get("/protected/");
      const message = res.data.message;
      const username = message.split(", ")[1].split(".")[0];
      setUser({ username });
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      await axiosInstance.post("api/auth/token/", { username, password });
      setIsAuthenticated(true);
      await checkAuth();
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/logout/");
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
