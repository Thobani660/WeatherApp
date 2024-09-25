import React from "react";

function DailyForecast({ dailyWeather, currentLocationWeather, unit }) {
  const getIconUrl = (iconCode) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <div className="bottom">
      {dailyWeather.length > 0
        ? dailyWeather.map((day, index) => (
            <div key={index} className="weather-card">
              <img src={getIconUrl(day.weather[0].icon)} alt="Weather icon" style={{ width: "40px", height: "40px" }} />
              <h3>{daysOfWeek[new Date(day.dt * 1000).getDay()]}</h3>
              <p>Temperature: {Math.round(day.main.temp)}°{unit === "imperial" ? "F" : "C"}</p>
              <p>Condition: {day.weather[0].description}</p>
            </div>
          ))
        : currentLocationWeather?.map((day, index) => (
            <div key={index} className="weather-card">
              <img src={getIconUrl(day.weather[0].icon)} alt="Weather icon" style={{ width: "30px", height: "30px" }} />
              <h5>{daysOfWeek[new Date(day.dt * 1000).getDay()]}</h5>
              <p>Temperature: {Math.round(day.temp.day)}°{unit === "imperial" ? "F" : "C"}</p>
              <p>Condition: {day.weather[0].description}</p>
            </div>
          ))}
    </div>
  );
}

export default DailyForecast;
