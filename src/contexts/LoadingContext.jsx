import { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    const handleStart = () => {
      setLoadingCount(prev => prev + 1);
      setLoading(true);
    };

    const handleEnd = () => {
      setLoadingCount(prev => {
        const newCount = prev - 1;
        if (newCount <= 0) {
          setLoading(false);
          return 0;
        }
        return newCount;
      });
    };

    window.addEventListener('api-request-start', handleStart);
    window.addEventListener('api-request-end', handleEnd);

    return () => {
      window.removeEventListener('api-request-start', handleStart);
      window.removeEventListener('api-request-end', handleEnd);
    };
  }, []);

  const value = { loading, loadingCount };

  return (
    <LoadingContext.Provider value={value}>
      {children}
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <div className="h-1 bg-indigo-600 relative overflow-hidden">
            <div className="h-full bg-indigo-400 absolute left-0 top-0 animate-[progress_2s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used within LoadingProvider');
  return ctx;
}

