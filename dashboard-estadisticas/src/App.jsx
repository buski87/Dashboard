import { useContext, useEffect, useState } from "react";
import Layout from "./components/Layout";
import ChartCard from "./components/ChartCard";
import StatsCard from "./components/StatsCard";
import WeatherSummary from "./components/WeatherSummary";
import { getStats } from "./utils/stats";
import {
  getWeatherData,
  getPrecipitationData,
  getWindData,
  getCloudData,
} from "./services/api";
import { cities } from "./data/cities";
import { DashboardContext } from "./context/DashboardContext";
import { useTranslation } from "react-i18next";

function App() {
  const { selectedCity, selectedDate, startHour, endHour } = useContext(DashboardContext);
  const { t } = useTranslation();

  const [labels, setLabels] = useState([]);
  const [temps, setTemps] = useState([]);
  const [precip, setPrecip] = useState([]);
  const [wind, setWind] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [loading, setLoading] = useState(true);

  const applyRange = (array) => array.slice(startHour, endHour + 1);

  const fetchAllData = async (cityName) => {
    setLoading(true);
    const city = cities.find((c) => c.name === cityName);
    if (!city) return;

    const [tempData, precipData, windData, cloudData] = await Promise.all([
      getWeatherData(city.lat, city.lon, selectedDate),
      getPrecipitationData(city.lat, city.lon, selectedDate),
      getWindData(city.lat, city.lon, selectedDate),
      getCloudData(city.lat, city.lon, selectedDate),
    ]);

    if (tempData?.hourly) {
      setLabels(tempData.hourly.time);
      setTemps(tempData.hourly.temperature_2m);
    }
    if (precipData?.hourly) setPrecip(precipData.hourly.precipitation);
    if (windData?.hourly) setWind(windData.hourly.windspeed_10m);
    if (cloudData?.hourly) setClouds(cloudData.hourly.cloudcover);

    setLoading(false);
  };

  useEffect(() => {
    fetchAllData(selectedCity);
  }, [selectedCity, selectedDate]);

  const hasData = labels.length && temps.length && precip.length && wind.length && clouds.length;

  return (
    <Layout
      sidebarProps={{ labels, temps, precip, wind, clouds }}>
      <div className="space-y-4">
        {loading && <p className="text-center text-gray-600 dark:text-gray-300">{t("loading")}</p>}

        {hasData && (
          <>
            <WeatherSummary
              city={selectedCity}
              tempAvg={getStats(applyRange(temps)).avg}
              precipSum={getStats(applyRange(precip)).sum}
              cloudsAvg={getStats(applyRange(clouds)).avg}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard title={t("stats.temperature")} stats={getStats(applyRange(temps))} unit="°C" />
              <StatsCard title={t("stats.precipitation")} stats={getStats(applyRange(precip))} unit="mm" />
              <StatsCard title={t("stats.wind")} stats={getStats(applyRange(wind))} unit="km/h" />
              <StatsCard title={t("stats.clouds")} stats={getStats(applyRange(clouds))} unit="%" />
            </div>

            <div id="charts-section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ChartCard labels={applyRange(labels)} data={applyRange(temps)} title={t("charts.temperature", { city: selectedCity })} type="line" />
              <ChartCard labels={applyRange(labels)} data={applyRange(precip)} title={t("charts.precipitation", { city: selectedCity })} type="bar" />
              <ChartCard labels={applyRange(labels)} data={applyRange(wind)} title={t("charts.wind", { city: selectedCity })} type="line" />
              <ChartCard labels={applyRange(labels)} data={applyRange(clouds)} title={t("charts.clouds", { city: selectedCity })} type="bar" />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default App;
