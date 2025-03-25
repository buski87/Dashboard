import axios from "axios";

export const getWeatherData = async (lat, lon, date) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&timezone=auto&start_date=${date}&end_date=${date}`;
  const res = await axios.get(url);
  return res.data;
};

export const getPrecipitationData = async (lat, lon, date) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=precipitation&timezone=auto&start_date=${date}&end_date=${date}`;
  const res = await axios.get(url);
  return res.data;
};

export const getWindData = async (lat, lon, date) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=windspeed_10m&timezone=auto&start_date=${date}&end_date=${date}`;
  const res = await axios.get(url);
  return res.data;
};

export const getCloudData = async (lat, lon, date) => {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=cloudcover&timezone=auto&start_date=${date}&end_date=${date}`;
  const res = await axios.get(url);
  return res.data;
};
