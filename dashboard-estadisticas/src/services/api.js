import axios from "axios";

// Consulta para temperatura
export const getWeatherData = async (lat = 41.38, lon = 2.17) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching temperature data", error);
    return null;
  }
};

// Consulta separada para precipitación
export const getPrecipitationData = async (lat = 41.38, lon = 2.17) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error("Error fetching precipitation data", error);
    return null;
  }
};

// Consulta separada para velocidad del viento
export const getWindData = async (lat = 41.38, lon = 2.17) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=windspeed_10m`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error("Error fetching wind data", error);
      return null;
    }
  };
  
  // Consulta separada para cobertura de nubes
  export const getCloudData = async (lat = 41.38, lon = 2.17) => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover`;
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error("Error fetching cloud cover data", error);
      return null;
    }
  };