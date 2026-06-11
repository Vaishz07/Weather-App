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
import WeatherDisplay from "./components/WeatherDisplay";
import SearchBar from "./components/SearchBar";
import DeveloperCard from "./components/DeveloperCard";
import ErrorDisplay from "./components/ErrorDisplay";
function App() {
  
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const apiKey = "1dc729a44fb9a80ff994b5b8268ac126";

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

  const handleCityChange = async (e) => {
    const value = e.target.value;
    setCity(value);

    if (!value.trim() || value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=8&appid=${apiKey}`;
      const res = await fetch(geoUrl);
      const data = await res.json();
      setSuggestions(data || []);
    } catch (err) {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    const fullCity = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
    setCity(fullCity);
    setSuggestions([]);
    setWeather(null);
    setError('');

    const apiKey = "1dc729a44fb9a80ff994b5b8268ac126";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${suggestion.name},${suggestion.country}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found. Try again!");
      const weatherData = await res.json();
      
      setWeather({
        name: weatherData.name,
        temp: Math.round(weatherData.main.temp),
        feelsLike: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        condition: weatherData.weather[0].main.toLowerCase(), 
        icon: weatherData.weather[0].icon
      });

      setCity('');
      
    } catch (err) {
      setError(err.message); 
      setWeather(null); 
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); 
    
    if (!city.trim()) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error("City not found. Try again!");
      const data = await res.json();
      
      setWeather({
        name: data.name,
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main.toLowerCase(), 
        icon: data.weather[0].icon
      });

      setError('');
      setCity(''); 
      setSuggestions([]);
      
    } catch (err) {
      setError(err.message); 
      setWeather(null); 
    }
  };


  return (
    <div className="row">
      <DeveloperCard />

    <div className="col-8 background-gradient d-flex justify-content-center align-items-center vh-100">
      <div className="glass-card text-center p-4">
        <SearchBar 
        city={city}
        handleCityChange={handleCityChange}
        handleSuggestionClick={handleSuggestionClick}
        suggestions={suggestions}
        handleSearch={handleSearch}
        searchImg={searchImg}/>
        <ErrorDisplay error={error} />
        <WeatherDisplay 
        weather={weather}
        getWeatherImage={getWeatherImage}
        humidityImg={humidityImg}
        windImg={windImg}
        />
      </div>
      </div>
      </div>
  );
}

export default App;