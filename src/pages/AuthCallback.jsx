import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Check if authentication is complete
    if (!loading) {
      if (isAuthenticated) {
        // Redirect to home after successful login
        navigate('/');
      } else {
        // If no token in URL and not authenticated, redirect to home
        const urlParams = new URLSearchParams(window.location.search);
        if (!urlParams.get('token')) {
          navigate('/');
        }
      }
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 mx-auto mb-4"></div>
        <p className="text-zinc-600">Đang xử lý đăng nhập...</p>
      </div>
    </div>
  );
}

