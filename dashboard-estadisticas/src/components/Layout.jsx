import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Sidebar from "./Sidebar";
import LanguageSelector from "./LanguageSelector";

const Layout = ({ children, sidebarProps }) => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
     

    
      <div
        className={`fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:flex-shrink-0`}
      >
        <Sidebar {...sidebarProps} />
      </div>

      
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        />
      )}

    
      <div className="flex-1 flex flex-col">
        <header className="bg-white dark:bg-gray-900 shadow p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            🌤️ {t('weatherDashboard.title')}
          </h1>
          <div className="flex items-center gap-4">
          <LanguageSelector />

          
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-gray-800 dark:text-white text-2xl transition-transform duration-300"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? (
         
              <svg className="w-6 h-6 transform rotate-90 transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              
              <svg className="w-6 h-6 transition duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        </header>

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
