import { request } from './http';

/** Admin endpoints, bound to one set of HTTP Basic credentials. */
export function createAdminApi({ username, password }) {
  const authorization = `Basic ${btoa(unescape(encodeURIComponent(`${username}:${password}`)))}`;
  const call = (path, options = {}) => request(path, { ...options, headers: { Authorization: authorization } });

  return {
    me: () => call('/api/admin/me'),

    listCategories: () => call('/api/admin/categories'),
    createCategory: (category) => call('/api/admin/categories', { method: 'POST', body: category }),
    updateCategory: (id, category) => call(`/api/admin/categories/${id}`, { method: 'PUT', body: category }),
    deleteCategory: (id) => call(`/api/admin/categories/${id}`, { method: 'DELETE' }),

    listItems: () => call('/api/admin/items'),
    createItem: (item) => call('/api/admin/items', { method: 'POST', body: item }),
    updateItem: (id, item) => call(`/api/admin/items/${id}`, { method: 'PUT', body: item }),
    setAvailability: (id, available) =>
      call(`/api/admin/items/${id}/availability`, { method: 'PATCH', body: { available } }),
    deleteItem: (id) => call(`/api/admin/items/${id}`, { method: 'DELETE' }),
  };
}
