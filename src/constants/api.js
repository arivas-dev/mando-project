
const baseUrl = 'http://127.0.0.1:8000/api/v1';
export const endpoints = {
  auth: {
    login: `${baseUrl}/login`,
    logout: `${baseUrl}/logout`,
    register: `${baseUrl}/register`
  },
  products: {
    retrieve: `${baseUrl}/products`,
    save: `${baseUrl}/products`,
    update: (productId) => `${baseUrl}/products/${productId}`,
    delete: (productId) => `${baseUrl}/products/${productId}`,
  },
  users: {
    retrieve: `${baseUrl}/user`,
    update: (userId) => `${baseUrl}/user/${userId}`,
  }
};
