import { API_ENDPOINTS, fetchClient } from '../config';

export const adminAPI = {
  getAllUsers: () => fetchClient(API_ENDPOINTS.ADMIN.USERS),
  
  createUser: (userData) => fetchClient(API_ENDPOINTS.AUTH.REGISTER, { // Using centralized register endpoint
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  deleteUser: (userId) => fetchClient(`${API_ENDPOINTS.ADMIN.USERS}${userId}`, {
    method: 'DELETE'
  }),

  getAllInvoices: () => fetchClient(API_ENDPOINTS.ADMIN.INVOICES),
};
