import { useState } from "react";

function ForecastSection({ forecast, getWeatherImage }) {
  const [activeDay, setActiveDay] = useState(0);
  const day = forecast[activeDay];

  const bottomStats = [
    { icon: "💨", label: "Wind Speed",  value: `${day.wind} km/h` },
    { icon: "💧", label: "Humidity",    value: `${day.humidity}%` },
    { icon: "🌡️", label: "Pressure",   value: `${day.pressure} hPa` },
  ];

  return (
    <div className="forecast-section mt-4">
      <h6 className="forecast-title">5 Day Forecast</h6>

      {/* Day tabs */}
      <div className="forecast-tabs">
        {forecast.map((d, i) => (
          <button
            key={d.dayKey}
            className={`forecast-tab ${activeDay === i ? "active" : ""}`}
            onClick={() => setActiveDay(i)}
          >
            {d.shortDay}
          </button>
        ))}
      </div>

      {/* Detail card */}
      <div className="forecast-detail-card">
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={getWeatherImage(day.condition)}
            alt={day.condition}
            style={{ width: "64px", height: "64px", objectFit: "contain" }}
          />
          <div>
            <p className="fw-bold mb-0" style={{ fontSize: "1rem" }}>{day.dayKey}</p>
            <p className="mb-0 text-capitalize opacity-75" style={{ fontSize: "0.85rem" }}>{day.description}</p>
          </div>
          <div className="d-flex align-items-baseline gap-3 ms-auto">
            <div className="text-center">
              <p className="forecast-temp-high mb-0">{day.high}°</p>
              <span className="forecast-temp-label">High</span>
            </div>
            <div className="forecast-divider" />
            <div className="text-center">
              <p className="forecast-temp-low mb-0">{day.low}°</p>
              <span className="forecast-temp-label">Low</span>
            </div>
          </div>
        </div>

        {/* Bottom stats row */}
        <div className="forecast-bottom-row">
          {bottomStats.map(({ icon, label, value }) => (
            <div key={label} className="forecast-stat">
              <span className="forecast-stat-icon">{icon}</span>
              <span className="forecast-stat-label">{label}</span>
              <span className="forecast-stat-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForecastSection;