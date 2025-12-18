'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authAPI } from '../lib/api/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check local storage on initial load
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, expectedRole) => {
    try {
      // Use the appropriate auth method if needed, but for now generic login is fine
      const response = await authAPI.login(email, password);
      
      if (!response.ok) {
        if (response.status === 401) return { success: false, error: 'Invalid credentials' };
        return { success: false, error: 'Login failed' };
      }

      const data = await response.json();
      const userObj = data.user || data; // Fallback if user is at root
      const token = data.token || data.access_token || userObj.token;
      
      // Determine Role
      const role = userObj.role || data.role || (email.includes('admin') ? 'admin' : 'user');

      // Role Mismatch Check
      if (expectedRole && role !== expectedRole) {
         return { success: false, error: `Access Denied: You are not authorized as ${expectedRole}` };
      }

      const userData = {
        id: userObj.id || userObj.user_id,
        name: userObj.name || email.split('@')[0],
        email: email,
        role: role, 
      };

      // Save session
      if (token) localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Redirect based on role
      if (role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/user/dashboard');
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error' };
    }
  };

  const logout = () => {
    // Determine redirect path based on user role
    const redirectPath = user?.role === 'admin' ? '/admin/login' : '/user/login';
    
    authAPI.logout(); // Optional: Call backend to invalidate token if your API supports it
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    router.push(redirectPath);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
