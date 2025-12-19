import { API_ENDPOINTS, fetchClient } from '../config';

export const adminAPI = {
  getAllUsers: () => fetchClient('/users/'),
  
  createUser: (userData) => fetchClient(API_ENDPOINTS.AUTH.REGISTER, { // Using centralized register endpoint
    method: 'POST',
    body: JSON.stringify(userData)
  }),

  deleteUser: (userId) => fetchClient(`/admin/users/${userId}`, {
    method: 'DELETE'
  }),

  getUser: async (userId) => {
    try {
        // We know /users/ (list) works and contains the data we need
        const listRes = await fetchClient('/users/');
        if (listRes.ok) {
            const users = await listRes.json();
            // Try matching by id (numeric) or as string
            const user = users.find(u => String(u.id) === String(userId));
            if (user) {
                return {
                    ok: true,
                    json: async () => user
                };
            }
        }
        // Fallback to direct GET if list fails or user not found
        // Note: Backend might return 405 for GET on /admin/users/{id}
        return fetchClient(`/admin/users/${userId}`);
    } catch (error) {
        console.error('getUser error:', error);
        return { ok: false };
    }
  },

  updateUser: (userId, userData) => fetchClient(`/admin/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  }),


  getAllInvoices: () => fetchClient(API_ENDPOINTS.ADMIN.INVOICES),
};
