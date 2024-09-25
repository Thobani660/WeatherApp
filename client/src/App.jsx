import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [dailyWeather, setDailyWeather] = useState([]);
  const [hourlyWeather, setHourlyWeather] = useState([]);
  const [location, setLocation] = useState("");
  const [savedLocations, setSavedLocations] = useState([]);
  const [unit, setUnit] = useState("imperial");
  const [weatherAlert, setWeatherAlert] = useState(null);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);

  const apiKey = '235407757cdf98cace4e2245ea49690a';

  useEffect(() => {

    const savedLocationsFromStorage = JSON.parse(localStorage.getItem('savedLocations'));
    if (savedLocationsFromStorage) {
      setSavedLocations(savedLocationsFromStorage);
    }
    
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
      setHourlyWeather(response.data.list.slice(0, 8));
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
    // location in the state and  in localStorage
    const updatedLocations = [...new Set([...savedLocations, loc])]; 
    setSavedLocations(updatedLocations);
    localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'imperial' ? 'metric' : 'imperial'));
  };

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const formatTime = (time) => {
    const date = new Date(time * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app">
      <div className="container" style={{ border: "2px solid lightyellow" }}>
        <div className="search" style={{ color: "white" }}>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter location"
            type="text"
            color="black"
            style={{ border: "2px solid gold", color: "white", boxShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}
          />
        </div>

        {/*  searched locations */}
        {savedLocations.length > 0 && (
          <div className="saved-locations">
            <h4 style={{ color: "gold" }}>Saved Locations</h4>
            <ul>
              {savedLocations.map((loc, index) => (
                <li key={index} onClick={() => setLocation(loc)} style={{ cursor: 'pointer', color: "white" }}>
                  {loc}
                </li>
              ))}
            </ul>
          </div>
        )}

        {weatherAlert && (
          <div className="alert">
            <h3>Weather Alert</h3>
            <p>{weatherAlert.description}</p>
          </div>
        )}

        {/* Top Weather Information */}
        <div className="top">
          <div className="location">
            <p>{data.city?.name || (currentLocationWeather && 'Current Location Weather')}</p>
            <div className="temp">
              {location || currentLocationWeather ? (
                <>
                  <h1 style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
                    {Math.round(dailyWeather[0]?.main.temp || currentLocationWeather?.[0]?.temp?.day || 0)}°{unit === 'imperial' ? 'F' : 'C'}
                  </h1>
                  <p style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
                    Humidity: {dailyWeather[0]?.main.humidity || currentLocationWeather?.[0]?.humidity || 0}%
                  </p>
                  <p style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
                    Wind Speed: {dailyWeather[0]?.wind.speed || currentLocationWeather?.[0]?.wind_speed || 0} {unit === 'imperial' ? 'mph' : 'm/s'}
                  </p>
                </>
              ) : (
                <h1 style={{ color: "gold", fontSize: "50px", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
                  Welcome to Phila's Weather Station
                </h1>
              )}
              {!location && !currentLocationWeather && (
                <p style={{ color: "gold" }}>Please enter your location to check your weather.</p>
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

        {/* Hourly Weather Section */}
        {location && hourlyWeather.length > 0 && (
          <div className="hourly-weather">
            <h3 style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>Hourly Forecast</h3>
            <div className="hourly-cards">
              {hourlyWeather.map((hour, index) => (
                <div key={index} className="hourly-card">
                  <p>{formatTime(hour.dt)}</p>
                  <img src={getIconUrl(hour.weather[0].icon)} alt="Weather icon" style={{ width: "30px", height: "30px" }} />
                  <p>{Math.round(hour.main.temp)}°{unit === 'imperial' ? 'F' : 'C'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Weather Cards */}
        <h3 style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)", marginBottom:"-50px" }}>Daily Forecast</h3>
        <div className="bottom">
          {dailyWeather.length > 0 ? (
            dailyWeather.map((day, index) => (
              <div key={index} className="weather-card">
                {day.weather[0].icon && (
                  <img
                    src={getIconUrl(day.weather[0].icon)}
                    alt="Weather icon"
                    style={{ width: "40px", height: "40px" }} 
                  />
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
                    <img
                      src={getIconUrl(day.weather[0].icon)}
                      alt="Weather icon"
                      style={{ width: "30px", height: "30px" }} 
                    />
                  )}
                  <h5>{daysOfWeek[(new Date(day.dt * 1000).getDay())]}</h5>
                  <p>Temperature: {Math.round(day.temp.day)}°{unit === 'imperial' ? 'F' : 'C'}</p>
                  <p>Condition: {day.weather[0].description}</p>
                </div>
              ))
            ) : (
              daysOfWeek.map((day, index) => (
                <div key={index} className="weather-card">
                  <h5 style={{ color: "gold" }}>{day}</h5>
                  <p>Temperature: 0°F</p>
                  <p>Condition: Go check outside</p>
                </div>
              ))
            )
          )}
        </div>
        <div className="unit-toggle">
        <button onClick={toggleUnit} style={{border:"1px solid gold",boxShadow:" 0 4px 8px rgba(201, 132, 4, 0.89)",marginTop:"-150px"}}>Switch to {unit === 'imperial' ? 'Celsius' : 'Fahrenheit'}</button>
      </div>
      </div>
      
    </div>
  );
}

export default App;


       
      
  
