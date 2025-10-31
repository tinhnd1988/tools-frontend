import { useEffect } from 'react';

export default function GoogleAnalytics() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID || 'G-HZM6XRCC4M';
    if (!gaId || gaId === '') return;
    
    // Check if already loaded
    if (window.gtag) return;
    
    // Load gtag.js script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);
    
    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){window.dataLayer.push(arguments);};
    
    // Configure gtag
    window.gtag('js', new Date());
    window.gtag('config', gaId);
  }, []);
  
  return null;
}

