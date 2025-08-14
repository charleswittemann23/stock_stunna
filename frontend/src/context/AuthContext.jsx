import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasLoggedOut, setHasLoggedOut] = useState(false);

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
  const register = async (registrationData) => {
  try {
    const response = await axiosInstance.post("api/auth/register/", registrationData);
    console.log(response)
    if (response.status === 201) {
      login(registrationData.email, registrationData.password)
      await checkAuth();
      return { success: true };
    }
    
    return { success: false, error: "Registration failed" };
    
  } catch (err) {
    console.error("Registration failed:", err.response?.data || err.message);
    
    const errorMessage = err.response?.data?.email?.[0] ||
                        err.response?.data?.username?.[0] || 
                        err.response?.data?.password?.[0] ||
                        err.response?.data?.detail ||
                        "Registration failed";
    
    return { 
      success: false, 
      error: errorMessage,
      status: err.response?.status 
    };
  }
};
 const login = async (email, password) => {
  try {
    setIsAuthenticated(false);
    setUser(null);
    
    const response = await axiosInstance.post("api/auth/token/", 
      { email, password }, 
      { withCredentials: true }
    );
    
    if (response.status === 200) {
      await new Promise(resolve => setTimeout(resolve, 100));
      await checkAuth();
      return { success: true };
    }
    
    return { success: false, error: "Login failed" };
    
  } catch (err) {
    
    console.error("Login failed:", err.response?.data || err.message);
    setIsAuthenticated(false);
    setUser(null);
    
    const errorMessage = err.response?.data?.detail || 
                        err.response?.data?.message || 
                        err.response?.data?.non_field_errors?.[0] ||
                        "Login failed";
    
    return { 
      success: false, 
      error: errorMessage,
      status: err.response?.status 
    };
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
      setHasLoggedOut(true)
    }
  };

  useEffect(() => {
    // Only check auth if user hasn't explicitly logged out
    if (!hasLoggedOut) {
      checkAuth();
    } else {
      setLoading(false); // Stop loading if logged out
    }
  }, [hasLoggedOut]); 

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};