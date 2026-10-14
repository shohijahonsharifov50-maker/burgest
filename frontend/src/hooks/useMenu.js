import { useCallback, useEffect, useState } from 'react';
import { fetchMenu } from '../api/menuApi';

/** Loads the public menu once and exposes a retry for the error state. */
export function useMenu() {
  const [state, setState] = useState({ status: 'loading', categories: [] });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setState((previous) => ({ ...previous, status: 'loading' }));
    fetchMenu(controller.signal)
      .then((categories) => setState({ status: 'ready', categories }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ status: 'error', categories: [] });
      });
    return () => controller.abort();
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
}
