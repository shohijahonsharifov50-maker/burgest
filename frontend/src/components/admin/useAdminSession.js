import { useCallback, useMemo, useState } from 'react';
import { createAdminApi } from '../../api/adminApi';
import { sessionStore } from '../../lib/storage';

const SESSION_KEY = 'burgesta-admin';

function readSession() {
  try {
    const saved = JSON.parse(sessionStore.get(SESSION_KEY));
    return saved?.username && saved?.password ? saved : null;
  } catch {
    return null;
  }
}

/**
 * Keeps the admin credentials for this browser tab only (sessionStorage), and gives back an API
 * client bound to them. `login` checks the credentials against the server before saving them.
 */
export function useAdminSession() {
  const [credentials, setCredentials] = useState(readSession);

  const login = useCallback(async (username, password) => {
    await createAdminApi({ username, password }).me();
    const next = { username, password };
    sessionStore.set(SESSION_KEY, JSON.stringify(next));
    setCredentials(next);
  }, []);

  const logout = useCallback(() => {
    sessionStore.remove(SESSION_KEY);
    setCredentials(null);
  }, []);

  const api = useMemo(() => (credentials ? createAdminApi(credentials) : null), [credentials]);
  return { api, username: credentials?.username, login, logout };
}
