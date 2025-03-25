const StatsCard = ({ title, stats, unit = "" }) => {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm">
        <h4 className="font-semibold text-gray-700 dark:text-white mb-2">{title}</h4>
        <ul className="text-gray-600 dark:text-gray-300 space-y-1">
          <li>🔹 Promedio: {stats.avg}{unit}</li>
          {stats.min !== undefined && <li>🔽 Mínimo: {stats.min}{unit}</li>}
          {stats.max !== undefined && <li>🔼 Máximo: {stats.max}{unit}</li>}
          {stats.sum !== undefined && <li>💧 Total: {stats.sum}{unit}</li>}
        </ul>
      </div>
    );
  };
  
  export default StatsCard;
  