const HourRangeSelector = ({ startHour, endHour, onChange }) => {
    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);
  
    return (
      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Desde:</label>
          <select
            value={startHour}
            onChange={(e) => onChange("start", e.target.value)}
            className="ml-2 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          >
            {hours.map((hour, i) => (
              <option key={i} value={i}>
                {hour}
              </option>
            ))}
          </select>
        </div>
  
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hasta:</label>
          <select
            value={endHour}
            onChange={(e) => onChange("end", e.target.value)}
            className="ml-2 p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
          >
            {hours.map((hour, i) => (
              <option key={i} value={i}>
                {hour}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  };
  
  export default HourRangeSelector;
  