// DailyForecast.js
import React from 'react';

const DailyForecast = ({ dailyWeather, currentLocationWeather, daysOfWeek, unit, getIconUrl }) => {
  return (
    <div className="bottom">
      {dailyWeather.length > 0 ? (
        dailyWeather.map((day, index) => (
          <div key={index} className="weather-card">
            <img src={getIconUrl(day.weather[0].icon)} alt="Weather icon" style={{ width: "40px", height: "40px" }} />
            <h3>{daysOfWeek[(new Date(day.dt * 1000).getDay())]}</h3>
            <p>Temperature: {Math.round(day.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</p>
            <p>Condition: {day.weather[0].description}</p>
          </div>
        ))
      ) : (
        daysOfWeek.map((day, index) => (
          <div key={index} className="weather-card">
            <h5>{day}</h5>
            <p>Temperature: 0°F</p>
            <p>Condition: Go check outside</p>
          </div>
        ))
      )}
    </div>
  );
};

export default DailyForecast;
