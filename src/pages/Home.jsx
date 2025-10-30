import { Link } from 'react-router-dom';
import { tools } from '../config/tools';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">{t('welcome')}</div>
      <div className="text-sm font-medium opacity-70">{t('tools_available')}</div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {tools.filter(x => x.path !== '/').map((item) => {
          const Icon = item.icon;
          return (
            <Link
              to={item.path}
              key={item.path}
              className="group rounded-2xl border p-6 bg-white flex gap-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-indigo-200/60 hover:bg-indigo-50/40"
            >
              <Icon className="w-7 h-7 text-indigo-600 mt-1 transition-colors duration-200 group-hover:text-indigo-700" />
              <div>
                <div className="font-medium transition-colors group-hover:text-indigo-800">{t(item.labelKey)}</div>
                <div className="text-xs opacity-70">{t(item.descKey)}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}


