import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [dailyWeather, setDailyWeather] = useState([]);
  const [location, setLocation] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [unit, setUnit] = useState("imperial");
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);

  const apiKey = '235407757cdf98cace4e2245ea49690a';

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeatherDataByCoords(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location, unit]);

  const fetchWeatherData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      const filteredData = response.data.list.filter((forecast, index) => index % 8 === 0);
      setData(response.data);
      setDailyWeather(filteredData);
      setWeatherAlert(response.data.alerts?.[0] || null);
      localStorage.setItem(location, JSON.stringify(filteredData));
      setCurrentLocationWeather(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const fetchWeatherDataByCoords = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=${unit}`;

    try {
      const response = await axios.get(url);
      const filteredData = response.data.daily.slice(0, 7);
      setCurrentLocationWeather(filteredData);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error);
    }
  };

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData();
      saveLocation(location);
      setLocation('');
    }
  };

  const saveLocation = (loc) => {
    setSavedLocations((prev) => [...new Set([...prev, loc])]);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="app">
   

      <div className="container">
      <div className="search" style={{ color:"black"}}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
          type="text"
          color="black"
          style={{border:"2px solid black",color:"black"}}
        />
      </div>

      {weatherAlert && (
        <div className="alert">
          <h3>Weather Alert</h3>
          <p>{weatherAlert.description}</p>
        </div>
      )}
        <div className="top">
          <div className="location" >
            <p>{data.city?.name || (currentLocationWeather && 'Current Location Weather')}</p>
            <div className="temp">
              {location || currentLocationWeather ? (
                <>
                  <h1>{Math.round(dailyWeather[0]?.main.temp || currentLocationWeather?.[0]?.temp?.day || 0)}°{unit === 'imperial' ? 'F' : 'C'}</h1>
                  <p>Humidity: {dailyWeather[0]?.main.humidity || currentLocationWeather?.[0]?.humidity || 0}%</p>
                  <p>Wind Speed: {dailyWeather[0]?.wind.speed || currentLocationWeather?.[0]?.wind_speed || 0} {unit === 'imperial' ? 'mph' : 'm/s'}</p>
                </>
              ) : (
                <h1 style={{color:"black"}}>Welcome to Phila's Weather Station</h1>
              )}
              {!location && !currentLocationWeather && (
                <p style={{color:"black"}}>Please enter your location to check your weather.</p>
              )}
            </div>

            <div className="description">
              <p>{dailyWeather[0]?.weather[0]?.description || currentLocationWeather?.[0]?.weather?.[0]?.description || ''}</p>
              {dailyWeather[0]?.weather[0]?.icon && (
                <img src={getIconUrl(dailyWeather[0].weather[0].icon)} alt="Weather icon" />
              )}
              {currentLocationWeather?.[0]?.weather?.[0]?.icon && (
                <img src={getIconUrl(currentLocationWeather[0].weather[0].icon)} alt="Weather icon" />
              )}
            </div>
          </div>
        </div>

        <div className="bottom">
          {dailyWeather.length > 0 ? (
            dailyWeather.map((day, index) => (
              <div key={index} className="weather-card">
                {day.weather[0].icon && (
                  <img src={getIconUrl(day.weather[0].icon)} alt="Weather icon" />
                )}
                <h3>{daysOfWeek[(new Date(day.dt * 1000).getDay())]}</h3>
                <p>Temperature: {Math.round(day.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</p>
                <p>Condition: {day.weather[0].description}</p>
              </div>
            ))
          ) : (
            currentLocationWeather ? (
              currentLocationWeather.map((day, index) => (
                <div key={index} className="weather-card">
                  {day.weather[0].icon && (
                    <img src={getIconUrl(day.weather[0].icon)} alt="Weather icon" />
                  )}
                  <h3>{daysOfWeek[(new Date(day.dt * 1000).getDay())]}</h3>
                  <p>Temperature: {Math.round(day.temp.day)}°{unit === 'imperial' ? 'F' : 'C'}</p>
                  <p>Condition: {day.weather[0].description}</p>
                </div>
              ))
            ) : (
              daysOfWeek.map((day, index) => (
                <div key={index} className="weather-card">
                  <h3>{day}</h3>
                  <p>Temperature: 0°F</p>
                  <p>Condition: No data</p>
                </div>
              ))
            )
          )}
        </div>
        <div className="saved-locations">
        <h3>Saved Locations</h3>
        {savedLocations.map((loc, index) => (
          <button key={index} onClick={() => setLocation(loc)}>
            {loc}
          </button>
        ))}
      </div>

      <div className="unit-toggle">
        <button onClick={toggleUnit}>Switch to {unit === 'imperial' ? 'Celsius' : 'Fahrenheit'}</button>
      </div>
      </div>

   
    </div>
  );
}

export default App;
