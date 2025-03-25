import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation(); // Accede al sistema de idiomas

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)} // Cambia idioma al seleccionar
      value={i18n.language} // Muestra el idioma actual seleccionado
      className="p-2 rounded border dark:bg-gray-800 dark:text-white"
    >
      <option value="es">Español 🇪🇸</option>
      <option value="en">English 🇬🇧</option>
    </select>
  );
};

export default LanguageSelector;
