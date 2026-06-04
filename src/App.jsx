import clearimg from "./assets/clear.png";
import cloudsimg from "./assets/clouds.png";
import rainimg from "./assets/rain.png";
import snowimg from "./assets/snow.png";
import mistimg from "./assets/mist.png";
import thunderstormimg from "./assets/thunderstorm.png";
import drizzleimg from "./assets/drizzle.png";
import humidityImg from "./assets/humidity.png";
import searchImg from "./assets/search.png";
import windImg from "./assets/wind.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import "./style.css";

function App() {
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeatherImage = (condition) => {
    const images = {
      clear: clearimg,
      clouds: cloudsimg,
      rain: rainimg,
      drizzle: drizzleimg,
      thunderstorm: thunderstormimg,
      snow: snowimg,
      mist: mistimg,
    };

    return images[condition] || clearimg;
  };

  const handleSearch = async (e) => {
    e.preventDefault(); 
    
    if (!city.trim()) return;

    const apiKey = "1dc729a44fb9a80ff994b5b8268ac126";


    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found. Try again!");
      const data = await res.json();
      
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main.toLowerCase(), 
        icon: data.weather[0].icon
      });

      setError('');
      setCity(''); 
      
    } catch (err) {
      setError(err.message); 
      setWeather(null); 
    }
  };


  return (
    <div className="background-gradient d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card text-center p-4">
        
        <form onSubmit={handleSearch} className="input-group mb-4 search-bar-container">
          <input 
            type="text" 
            className="form-control bg-transparent border-0 text-dark shadow-none ps-3"
            placeholder="Enter City" 
            value={city} 
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="btn text-white border-0 p-0" type="submit">
            <img src={searchImg} alt="Search" className="icon-small" />
          </button>
        </form>
         
{error && (
  <div className="text-danger small fw-bold mb-3 opacity-90 animate-fade">
    ⚠️ {error}
  </div>
)}

        {weather ? (
          <div>
            <h2 className="fs-3 fw-normal mb-1">{weather.name}</h2> 
            <img 
              src={getWeatherImage(weather.condition)} 
              alt={weather.condition} 
              className="weather-icon my-2"
            />
            <h1 className="display-1 fw-bold m-0">{weather.temp}°</h1>
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
      </div>
    </div>
  );
}

export default App;
