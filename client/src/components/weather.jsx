import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './Weather.css'; // Make sure to create a CSS file for styling

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  // Replace these with actual values
  const lat = 'YOUR_LATITUDE'; // e.g., "29.6167"
  const lon = 'YOUR_LONGITUDE'; // e.g., "30.3833"
  const apiKey = 'YOUR_API_KEY'; // Your OpenWeatherMap API key

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&units=metric&appid=${apiKey}`
        );
        setWeatherData(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching weather data:', err);
      }
    };
    fetchWeatherData();
  }, [lat, lon, apiKey]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="weather-container">
      <h1>7-Day Weather Forecast</h1>
      <div className="weather-cards">
        {weatherData.daily.slice(1, 8).map((forecast, index) => {
          const date = new Date(forecast.dt * 1000);
          const dayOfWeek = daysOfWeek[date.getDay()];

          return (
            <div key={index} className="weather-card">
              <h2>{dayOfWeek}</h2>
              <p>Temperature: {forecast.temp.day}°C</p>
              <p>Weather: {forecast.weather[0].description}</p>
              <p>Humidity: {forecast.humidity}%</p>
              <p>Wind Speed: {forecast.wind_speed} m/s</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Weather;
