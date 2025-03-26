import { useTranslation } from "react-i18next";

const StatsCard = ({ title, stats, unit = "" }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow text-sm md:text-base">
      <h4 className="font-semibold text-gray-700 dark:text-white mb-2">{title}</h4>
      <ul className="text-gray-600 dark:text-gray-300 space-y-1">
        <li>{t("stats.avg")}: {stats.avg}{unit}</li>
        {stats.min !== undefined && <li>{t("stats.min")}: {stats.min}{unit}</li>}
        {stats.max !== undefined && <li>{t("stats.max")}: {stats.max}{unit}</li>}
        {stats.sum !== undefined && <li>{t("stats.sum")}: {stats.sum}{unit}</li>}
      </ul>
    </div>
  );
};

export default StatsCard;
