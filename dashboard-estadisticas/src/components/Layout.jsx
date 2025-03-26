import { useTranslation } from 'react-i18next';
import Sidebar from "./Sidebar";
import LanguageSelector from "./LanguageSelector";

const Layout = ({ children, sidebarProps }) => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar {...sidebarProps} />

      <div className="flex-1 flex flex-col">
        {/* Header con el título y el selector */}
        <header className="bg-white dark:bg-gray-900 shadow p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              🌤️ {t('weatherDashboard.title')}
            </h1>
            <LanguageSelector />
          </div>
        </header>

        {/* Contenido principal */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
