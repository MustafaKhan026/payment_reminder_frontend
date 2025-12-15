import { API_BASE_URL, API_ENDPOINTS } from './config';

/**
 * Get all users API call
 * @returns {Promise<Response>} - Fetch response object
 */
export const getUsersAPI = async () => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.GET_USERS}`, {
    method: 'GET',
    headers: headers,
  });
  return response;
};
