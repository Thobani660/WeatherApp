import React from "react";

function HourlyForecast({ hourlyWeather, unit }) {
  const getIconUrl = (iconCode) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="hourly-weather">
      <h3 style={{ color: "gold" }}>Hourly Forecast</h3>
      <div className="hourly-cards">
        {hourlyWeather.map((hour, index) => (
          <div key={index} className="hourly-card">
            <p>{formatTime(hour.dt)}</p>
            <img
              src={getIconUrl(hour.weather[0].icon)}
              alt="Weather icon"
              style={{ width: "30px", height: "30px" }}
            />
            <p>{Math.round(hour.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
