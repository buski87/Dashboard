import { useTranslation } from "react-i18next";

const WeatherSummary = ({ city, tempAvg, precipSum, cloudsAvg }) => {
  const { t } = useTranslation();

  const getSkyKey = () => {
    if (cloudsAvg < 20) return "sky.clear";
    if (cloudsAvg < 50) return "sky.partly";
    if (cloudsAvg < 80) return "sky.cloudy";
    return "sky.very";
  };

  const getRainKey = () => {
    if (precipSum === 0) return "rain.none";
    if (precipSum < 2) return "rain.light";
    return "rain.heavy";
  };

  const skyText = t(getSkyKey());
  const rainText = t(getRainKey());

  return (
    <div className="border-l-4 border-blue-400 bg-blue-100 dark:bg-blue-200/10 p-4 rounded text-sm mb-4 text-gray-800 dark:text-white">
      <p>
        {t("summary.intro", {
          city,
          temp: tempAvg,
          sky: skyText,
          rain: rainText
        })}
      </p>
    </div>
  );
};

export default WeatherSummary;
