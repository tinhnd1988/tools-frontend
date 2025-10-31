import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { tools } from '../config/tools';

export default function SEO() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const current = tools.find(tl => tl.path === pathname);
  
  useEffect(() => {
    const title = current ? `${t(current.labelKey)} - ${t('title')}` : t('title');
    document.title = title;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    const desc = current ? `${t(current.descKey || current.labelKey)} - ${t('title')}` : document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    metaDesc.setAttribute('content', desc);
    
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', desc);
  }, [pathname, current, t, i18n.language]);
  
  return null;
}

