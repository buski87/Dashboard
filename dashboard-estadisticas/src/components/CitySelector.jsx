import { cities } from "../data/cities";

const CitySelector = ({ selectedCity, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        Selecciona una ciudad:
      </label>
      <select
        value={selectedCity}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
      >
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CitySelector;
