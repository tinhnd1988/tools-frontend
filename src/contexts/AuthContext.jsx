import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useApi } from './ApiContext';

const AuthContext = createContext(null);

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }) {
  const { http, baseURL } = useApi();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [loading, setLoading] = useState(true);

  // Set token to axios instance
  useEffect(() => {
    if (token) {
      http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      delete http.defaults.headers.common['Authorization'];
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token, http]);

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (savedToken) {
        setToken(savedToken);
        try {
          const response = await http.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            // Token invalid, clear it
            setToken(null);
          }
        } catch (error) {
          // Token invalid or expired
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, [http]);

  const login = useCallback((userData, authToken) => {
    setUser(userData);
    setToken(authToken);
  }, []);

  const logout = useCallback(async () => {
    try {
      if (token) {
        await http.post('/auth/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
    }
  }, [token, http]);

  const redirectToGoogle = () => {
    window.location.href = `${baseURL}/auth/google`;
  };

  const redirectToFacebook = () => {
    window.location.href = `${baseURL}/auth/facebook`;
  };

  // Handle OAuth callback - check URL for token
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenParam = urlParams.get('token');
    const userParam = urlParams.get('user');
    const errorParam = urlParams.get('error');

    if (errorParam) {
      console.error('OAuth error:', decodeURIComponent(errorParam));
      alert('Đăng nhập thất bại: ' + decodeURIComponent(errorParam));
      // Clean URL
      window.history.replaceState({}, document.title, '/');
      setLoading(false);
      return;
    }

    if (tokenParam && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        login(userData, tokenParam);
        // Clean URL - will redirect via AuthCallback component
        window.history.replaceState({}, document.title, '/auth/callback');
      } catch (error) {
        console.error('Error parsing callback data:', error);
        alert('Lỗi xử lý đăng nhập');
        window.history.replaceState({}, document.title, '/');
      }
    }
  }, [login]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    redirectToGoogle,
    redirectToFacebook,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

