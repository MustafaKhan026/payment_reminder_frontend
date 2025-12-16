import { API_ENDPOINTS, fetchClient } from '../config';

export const adminAPI = {
  getAllUsers: async () => {
    return fetchClient(API_ENDPOINTS.ADMIN.USERS);
  },

  getAllInvoices: async () => {
    return fetchClient(API_ENDPOINTS.ADMIN.INVOICES); 
  },
  
  // Example admin-only function
  deleteUser: async (userId) => {
    return fetchClient(`/users/${userId}`, {
      method: 'DELETE',
    });
  }
};
