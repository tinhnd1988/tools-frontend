import { createContext, useContext, useMemo } from 'react';
import axios from 'axios';

const ApiContext = createContext(null);

export function ApiProvider({ children }) {
  const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://mmo-tools-backend.test/api';
  const client = useMemo(() => {
    const instance = axios.create({ baseURL, timeout: 30000 }); // 30 seconds
    
    // Request interceptor - add loading
    instance.interceptors.request.use((config) => {
      // Dispatch custom event for loading
      window.dispatchEvent(new CustomEvent('api-request-start', { detail: config }));
      return config;
    });
    
    // Response interceptor - remove loading
    instance.interceptors.response.use(
      (response) => {
        window.dispatchEvent(new CustomEvent('api-request-end'));
        return response;
      },
      (error) => {
        window.dispatchEvent(new CustomEvent('api-request-end'));
        return Promise.reject(error);
      }
    );
    
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


