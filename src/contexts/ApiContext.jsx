import { createContext, useContext, useMemo } from 'react';
import axios from 'axios';

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://mmo-tools-backend.test/api';
  const client = useMemo(() => {
    const instance = axios.create({ baseURL, timeout: 10000 });
    return instance;
  }, [baseURL]);

  const value = useMemo(() => ({ http: client, baseURL }), [client, baseURL]);
  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const ctx = useContext(ApiContext);
  if (!ctx) throw new Error('useApi must be used within ApiProvider');
  return ctx;
}


