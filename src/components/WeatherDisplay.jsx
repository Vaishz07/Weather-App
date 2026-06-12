function WeatherDisplay({ weather, getWeatherImage, humidityImg, windImg, sunriseImg, sunsetImg, pressureImg }) {
  if (!weather) return (
    <p className="opacity-75 my-5 text-center">Search for a city to see the weather</p>
  );

  const stats = [
    { img: sunriseImg,  alt: "Sunrise",  value: weather.sunrise,        label: "Sunrise" },
    { img: sunsetImg,   alt: "Sunset",   value: weather.sunset,         label: "Sunset" },
    { img: humidityImg, alt: "Humidity", value: `${weather.humidity}%`, label: "Humidity" },
    { img: windImg,     alt: "Wind",     value: `${weather.wind} km/h`, label: "Wind Speed" },
  ];

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 mt-3 px-md-2">
      {/* Left — City, temp, condition */}
      <div className="text-start d-flex flex-column" style={{ flex: 1 }}>
        <h1 className="fw-bold mb-0" style={{ fontSize: "3rem" }}>{weather.name}</h1>
        <p className="opacity-75 mb-3" style={{ fontSize: "0.88rem" }}>{weather.dateTime}</p>

        <div className="d-flex align-items-center gap-2 mb-3">
          <img src={getWeatherImage(weather.condition)} alt={weather.condition} className="weather-icon-lg m-0" />
          <h1 className="temp-display m-0">{weather.temp}°</h1>
        </div>

        <div className="feels-like-pill shadow-sm align-self-start">
          <span className="opacity-75 me-2">🌡️</span> Feels like {weather.feelsLike}°
        </div>
      </div>

      {/* Right — Stats grid */}
      <div className="stats-grid">
        {stats.map(({ img, alt, value, label }) => (
          <div key={label} className="stat-card">
            {img && <img src={img} alt={alt} className="stat-icon mb-1" />}
            <p className="stat-value">{value}</p>
            <span className="stat-label">{label}</span>
          </div>
        ))}

        <div className="stat-card pressure-card d-flex flex-row align-items-center justify-content-center gap-3">
          {pressureImg && <img src={pressureImg} alt="Pressure" className="stat-icon" />}
          <div className="text-start">
            <p className="stat-value mb-0">{weather.pressure} hPa</p>
            <span className="stat-label">Pressure</span>
          </div>
        </div>
      </div>

    </div>
  );
}

export default WeatherDisplay;