import { API_BASE_URL, API_ENDPOINTS } from './config';

/**
 * Get all users API call
 * @returns {Promise<Response>} - Fetch response object
 */
export const getUsersAPI = async (token = null) => {
  if (!token) {
    token = localStorage.getItem('token');
  }
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`; // Ensure strictly matches Backend expectation
  }

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_USERS}`, {
    method: 'GET',
    headers: headers,
  });
  return response;
};
