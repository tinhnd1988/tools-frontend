import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { tools } from '../config/tools';

export default function Layout() {
  const { /* theme, setTheme */ } = useTheme();
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const current = tools.find(tl => tl.path === pathname);
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <div className="flex max-w-7xl mx-auto">
        <Sidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <h2 className="text-lg font-semibold">{current ? t(current.labelKey) : t('title')}</h2>
            <select
              className="rounded px-3 py-1.5 border bg-white"
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
              <option value="vi">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>
          <Outlet />
          <footer className="pt-10 border-t">
            <div className="flex items-center justify-between text-sm opacity-70">
              <div>© {new Date().getFullYear()} {t('title')}</div>
              <div className="flex gap-3">
                <a href="https://facebook.com" target="_blank" className="hover:underline">Facebook</a>
                <a href="https://zalo.me" target="_blank" className="hover:underline">Zalo</a>
                <a href="https://t.me" target="_blank" className="hover:underline">Telegram</a>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}


