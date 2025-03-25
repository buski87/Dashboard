const WeatherSummary = ({ city, tempAvg, precipSum, cloudsAvg }) => {
    const getSkyDescription = () => {
      if (cloudsAvg < 20) return { text: "despejado ☀️", color: "bg-yellow-100 border-yellow-400" };
      if (cloudsAvg < 50) return { text: "parcialmente nublado 🌤️", color: "bg-blue-100 border-blue-400" };
      if (cloudsAvg < 80) return { text: "nublado ☁️", color: "bg-gray-100 border-gray-400" };
      return { text: "muy nublado 🌫️", color: "bg-gray-300 border-gray-600" };
    };
  
    const getRainDescription = () => {
      if (precipSum === 0) return { text: "no se esperan lluvias.", color: "" };
      if (precipSum < 2) return { text: "se esperan lluvias ligeras ☔.", color: "bg-blue-100 border-blue-300" };
      return { text: "se esperan lluvias intensas 🌧️.", color: "bg-blue-200 border-blue-500" };
    };
  
    const sky = getSkyDescription();
    const rain = getRainDescription();
  
    // Combina estilos si hay lluvia
    const cardColor = rain.color || sky.color;
  
    return (
      <div className={`border-l-4 p-4 rounded text-sm mb-4 text-gray-800 dark:text-white ${cardColor}`}>
        <p>
          Hoy en <strong>{city}</strong> la temperatura media es de <strong>{tempAvg}°C</strong>, el cielo estará <strong>{sky.text}</strong> y {rain.text}
        </p>
      </div>
    );
  };
  
  export default WeatherSummary;
  