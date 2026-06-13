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
import sunriseImg from "./assets/sunrise.png";
import sunsetImg from "./assets/sunset.png";
import pressureImg from "./assets/pressure.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import "./style.css";
import WeatherDisplay from "./components/WeatherDisplay";
import SearchBar from "./components/SearchBar";
import DeveloperCard from "./components/DeveloperCard";
import ErrorDisplay from "./components/ErrorDisplay";
import ForecastSection from "./components/ForecastSection";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

const weatherImages = {
  clear: clearimg, clouds: cloudsimg, rain: rainimg,
  drizzle: drizzleimg, thunderstorm: thunderstormimg,
  snow: snowimg, mist: mistimg,
};

const getWeatherImage = (condition) => weatherImages[condition] || clearimg;
const formatTime = (unix) =>
  new Date(unix * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
const getDateTime = () => {
  const now = new Date();
  const date = now.toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "short" });
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `${date} • ${time}`;
};
const buildWeather = (data) => ({
  name: data.name,
  temp: Math.round(data.main.temp),
  feelsLike: Math.round(data.main.feels_like),
  humidity: data.main.humidity,
  wind: data.wind.speed,
  condition: data.weather[0].main.toLowerCase(),
  icon: data.weather[0].icon,
  sunrise: formatTime(data.sys.sunrise),
  sunset: formatTime(data.sys.sunset),
  pressure: data.main.pressure,
  dateTime: getDateTime(),
});

// Groups 3-hour forecast slots into daily summaries
const buildForecast = (list) => {
  const days = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
    const shortDay = date.toLocaleDateString("en-US", { weekday: "short" });
    if (!days[dayKey]) {
      days[dayKey] = {
        dayKey, shortDay,
        temps: [], condition: item.weather[0].main.toLowerCase(),
        humidity: item.main.humidity, wind: item.wind.speed,
        pressure: item.main.pressure,
        description: item.weather[0].description,
      };
    }
    days[dayKey].temps.push(item.main.temp);
  });

  return Object.values(days).slice(0, 5).map((d) => ({
    ...d,
    high: Math.round(Math.max(...d.temps)),
    low: Math.round(Math.min(...d.temps)),
  }));
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);

 const handleCityChange = async (e) => {
  const value = e.target.value;
  setCity(value);

  if (!value.trim() || value.length < 1) { setSuggestions([]); return; } // ← was < 2

  try {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=8&appid=${apiKey}`);
    const data = await res.json();
    setSuggestions(data || []);
  } catch { setSuggestions([]); }
};

  const fetchWeatherAndForecast = async (cityName, countryCode) => {
    const query = countryCode ? `${cityName},${countryCode}` : cityName;
    const [weatherRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${apiKey}`),
    ]);
    if (!weatherRes.ok) throw new Error("City not found. Try again!");
    const weatherData = await weatherRes.json();
    const forecastData = await forecastRes.json();
    return { weatherData, forecastData };
  };

  const handleSuggestionClick = async (suggestion) => {
    const fullCity = `${suggestion.name}${suggestion.state ? `, ${suggestion.state}` : ''}, ${suggestion.country}`;
    setCity(fullCity);
    setSuggestions([]);
    setWeather(null);
    setError('');
    try {
      const { weatherData, forecastData } = await fetchWeatherAndForecast(suggestion.name, suggestion.country);
      setWeather(buildWeather(weatherData));
      setForecast(buildForecast(forecastData.list));
      setCity('');
    } catch (err) { setError(err.message); setWeather(null); setForecast([]); }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    try {
      const { weatherData, forecastData } = await fetchWeatherAndForecast(city);
      setWeather(buildWeather(weatherData));
      setForecast(buildForecast(forecastData.list));
      setError('');
      setCity('');
      setSuggestions([]);
    } catch (err) { setError(err.message); setWeather(null);  setForecast([]); }
  };

  return (
    <div className="background-gradient min-vh-100 d-flex align-items-center py-4">
      <div className="container-fluid px-4 px-md-5" style={{ maxWidth: "1400px" }}>
        <div className="row justify-content-center align-items-center gx-4">

          <div className="col-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
            <DeveloperCard />
          </div>

          <div className="col-12 col-lg-9 col-xl-8">
            <div className="glass-card text-start p-4 mx-auto w-100" style={{ maxWidth: "780px" }}>
              <SearchBar
                city={city}
                handleCityChange={handleCityChange}
                handleSuggestionClick={handleSuggestionClick}
                suggestions={suggestions}
                handleSearch={handleSearch}
                searchImg={searchImg}
              />
              <ErrorDisplay error={error} />
              <WeatherDisplay
                weather={weather}
                getWeatherImage={getWeatherImage}
                humidityImg={humidityImg}
                windImg={windImg}
                sunriseImg={sunriseImg}
                sunsetImg={sunsetImg}
                pressureImg={pressureImg}
              />
              {forecast.length > 0 && (
                <ForecastSection forecast={forecast} getWeatherImage={getWeatherImage} />
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;