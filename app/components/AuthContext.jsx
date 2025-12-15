'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginAPI, registerAPI } from '../api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);

      if (!response.ok) {
        if (response.status === 401) {
          return { success: false, error: 'Invalid email or password.' };
        } else if (response.status === 404) {
          return { success: false, error: 'User not found.' };
        }
        return { success: false, error: 'Login failed. Please try again.' };
      }

      const data = await response.json();
      
      // Store user data
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await registerAPI(name, email, password);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 400) {
          return { success: false, error: errorData.detail || 'User already exists with this email.' };
        } else if (response.status === 422) {
          return { success: false, error: 'Invalid input. Please check your information.' };
        }
        return { success: false, error: 'Registration failed. Please try again.' };
      }

      const data = await response.json();
      
      // Store user data
      const userData = {
        id: data.id,
        name: data.name,
        email: data.email,
      };
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Store token if provided
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      router.push('/dashboard');
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
