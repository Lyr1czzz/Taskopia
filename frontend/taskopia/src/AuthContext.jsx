import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from './axiosConfig';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await axiosInstance.get('/Authentication/Status');
      setIsAuthenticated(response.data.isAuthenticated);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const login = async (email, password) => {
    try {
      await axiosInstance.post('/Authentication/Login', { email, password });
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post('/Authentication/Logout');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);