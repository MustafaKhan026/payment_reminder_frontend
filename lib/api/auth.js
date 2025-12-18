import { API_ENDPOINTS, fetchClient } from '../config';

export const authAPI = {
  login: async (email, password) => {
    return fetchClient(API_ENDPOINTS.AUTH.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },
  
  register: async (name, email, password) => {
    return fetchClient(API_ENDPOINTS.AUTH.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
  },

  logout: () => {
    // Note: Actual redirect is handled by AuthContext based on user role
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
