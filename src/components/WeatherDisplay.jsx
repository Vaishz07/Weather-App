function WeatherDisplay({ weather, getWeatherImage, humidityImg, windImg }) {
  return (
    <>
      {weather ? (
        <div>
          <h2 className="fs-3 fw-normal mb-1">{weather.name}</h2> 
          <img 
            src={getWeatherImage(weather.condition)} 
            alt={weather.condition} 
            className="weather-icon my-2"
          />
          <h1 className="display-1 fw-bold m-0 mb-2 text-white">{weather.temp}°</h1>
          <p className="fs-4 fw-bold text-white mb-3">Feels like {weather.feelsLike}°</p>
          <p className="fs-5 weather-condition mb-4">{weather.condition}</p>

          <div className="row pt-3">
            <div className="col-6 d-flex align-items-center justify-content-center gap-2">
              <img src={humidityImg} alt="Humidity" className="icon-small stat-icon" />
              <div className="text-start">
                  <span className="d-block fw-bold fs-5 stat-value">{weather.humidity} %</span>
                  <span className="small opacity-75 stat-label text-light">Humidity</span>
              </div>
            </div>
            
            <div className="col-6 d-flex align-items-center justify-content-center gap-2">
              <img src={windImg} alt="Wind" className="icon-small stat-icon" />
              <div className="text-start">
                  <span className="d-block fw-bold fs-5 stat-value">{weather.wind} km/h </span>
                  <span className="small opacity-75 stat-label text-light">Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p className="opacity-75 my-5"></p>
      )}
    </>
  );
}

export default WeatherDisplay;