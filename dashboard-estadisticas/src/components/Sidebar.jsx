const Sidebar = () => {
    return (
      <aside className="w-64 bg-gray-100 dark:bg-gray-900 h-screen p-4">
        <nav>
          <ul className="space-y-4 text-gray-700 dark:text-gray-300">
            <li className="hover:text-blue-500 cursor-pointer">Inicio</li>
            <li className="hover:text-blue-500 cursor-pointer">Gráficas</li>
            <li className="hover:text-blue-500 cursor-pointer">Filtros</li>
          </ul>
        </nav>
      </aside>
    );
  };
  
  export default Sidebar;
  