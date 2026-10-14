import { request } from './http';

/** Public menu: [{ slug, name, note, items: [{ id, name, price, weightGrams, tag }] }]. */
export function fetchMenu(signal) {
  return request('/api/menu', { signal });
}
