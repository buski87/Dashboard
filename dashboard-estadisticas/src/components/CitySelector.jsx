import { useTranslation } from "react-i18next";
import { cities } from "../data/cities"; // Asegúrate de importar correctamente

const CitySelector = ({ selectedCity, onChange }) => {
  const { t } = useTranslation();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {t("sidebar.city")}
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
