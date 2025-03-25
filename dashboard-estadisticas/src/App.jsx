import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import ChartCard from "./components/ChartCard";
import CitySelector from "./components/CitySelector";
import HourRangeSelector from "./components/HourRangeSelector";
import {
  getWeatherData,
  getPrecipitationData,
  getWindData,
  getCloudData,
} from "./services/api";
import { cities } from "./data/cities";

function App() {
  const [selectedCity, setSelectedCity] = useState("Barcelona");
  const [labels, setLabels] = useState([]);
  const [temps, setTemps] = useState([]);
  const [precip, setPrecip] = useState([]);
  const [wind, setWind] = useState([]);
  const [clouds, setClouds] = useState([]);
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(23);

  const handleHourChange = (type, value) => {
    if (type === "start") setStartHour(Number(value));
    if (type === "end") setEndHour(Number(value));
  };

  const applyRange = (array) => array.slice(startHour, endHour + 1);

  const fetchAllData = async (cityName) => {
    const city = cities.find((c) => c.name === cityName);
    if (!city) return;

    const [tempData, precipData, windData, cloudData] = await Promise.all([
      getWeatherData(city.lat, city.lon),
      getPrecipitationData(city.lat, city.lon),
      getWindData(city.lat, city.lon),
      getCloudData(city.lat, city.lon),
    ]);

    if (tempData?.hourly) {
      setLabels(tempData.hourly.time);
      setTemps(tempData.hourly.temperature_2m);
    }

    if (precipData?.hourly) {
      setPrecip(precipData.hourly.precipitation);
    }

    if (windData?.hourly) {
      setWind(windData.hourly.windspeed_10m);
    }

    if (cloudData?.hourly) {
      setClouds(cloudData.hourly.cloudcover);
    }
  };

  useEffect(() => {
    fetchAllData(selectedCity);
  }, [selectedCity]);

  return (
    <Layout>
      <CitySelector selectedCity={selectedCity} onChange={setSelectedCity} />
      <HourRangeSelector
        startHour={startHour}
        endHour={endHour}
        onChange={handleHourChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChartCard
          labels={applyRange(labels)}
          data={applyRange(temps)}
          title={`Temperatura Horaria - ${selectedCity}`}
          type="line"
        />
        <ChartCard
          labels={applyRange(labels)}
          data={applyRange(precip)}
          title={`Precipitación Horaria - ${selectedCity}`}
          type="bar"
        />
        <ChartCard
          labels={applyRange(labels)}
          data={applyRange(wind)}
          title={`Velocidad del Viento - ${selectedCity} (km/h)`}
          type="line"
        />
        <ChartCard
          labels={applyRange(labels)}
          data={applyRange(clouds)}
          title={`Cobertura de Nubes - ${selectedCity} (%)`}
          type="bar"
        />
      </div>
    </Layout>
  );
}

export default App;
