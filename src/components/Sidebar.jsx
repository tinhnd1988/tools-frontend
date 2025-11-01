import { NavLink } from 'react-router-dom';
import { tools, donateItem } from '../config/tools';
import { useTranslation } from 'react-i18next';
import toolsLogo from '../assets/tools-logo.png';
import OptimizedImage from './OptimizedImage';

export default function Sidebar({ className = '', onNavigate = () => {} }) {
  const { t } = useTranslation();
  return (
    <aside className={`w-64 shrink-0 border-r bg-white h-screen p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <OptimizedImage 
          src={toolsLogo} 
          alt="logo" 
          width={32} 
          height={32} 
          className="w-8 h-8 rounded" 
          loading="eager"
        />
        <h1 className="text-xl font-bold">{t('title')}</h1>
      </div>
      <nav className="space-y-1">
        {tools.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded px-3 py-2 text-sm ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-zinc-100'}`
              }
              end={item.path === '/'}
              onClick={onNavigate}
            >
              <Icon className="w-4 h-4" /> {t(item.labelKey)}
            </NavLink>
          );
        })}
        <div className="pt-2 mt-2 border-t">
          <NavLink
            to={donateItem.path}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded px-3 py-2 text-sm ${isActive ? 'bg-indigo-600 text-white' : 'hover:bg-zinc-100'}`
            }
            onClick={onNavigate}
          >
            {t(donateItem.labelKey)}
          </NavLink>
        </div>
      </nav>
    </aside>
  );
}


