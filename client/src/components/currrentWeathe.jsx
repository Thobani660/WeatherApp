import React from 'react';

const CurrentWeather = ({ data = {}, dailyWeather = [], currentLocationWeather = [], unit, getIconUrl }) => {
  const cityName = data?.city?.name || 'Current Location Weather';

  const temperature = dailyWeather[0]?.main?.temp || currentLocationWeather[0]?.temp?.day || 0;
  const humidity = dailyWeather[0]?.main?.humidity || currentLocationWeather[0]?.humidity || 0;
  const windSpeed = dailyWeather[0]?.wind?.speed || currentLocationWeather[0]?.wind_speed || 0;
  const description = dailyWeather[0]?.weather?.[0]?.description || currentLocationWeather[0]?.weather?.[0]?.description || '';
  const icon = dailyWeather[0]?.weather?.[0]?.icon || currentLocationWeather[0]?.weather?.[0]?.icon;

  return (
    <div className="top">
      <div className="location">
        <p>{cityName}</p>
        <div className="temp">
          <h1 style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
            {Math.round(temperature)}°{unit === 'imperial' ? 'F' : 'C'}
          </h1>
          <p style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
            Humidity: {humidity}%
          </p>
          <p style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
            Wind Speed: {windSpeed} {unit === 'imperial' ? 'mph' : 'm/s'}
          </p>
        </div>
        <div className="description">
          <p>{description}</p>
          <img 
            src={getIconUrl(icon)} 
            alt="Weather icon"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
