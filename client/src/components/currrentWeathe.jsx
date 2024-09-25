import React from "react";

function CurrentWeather({ data, dailyWeather, currentLocationWeather, unit }) {
  const getIconUrl = (iconCode) =>
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <div className="top">
      <div className="location">
        <p>{data.city?.name || (currentLocationWeather && "Current Location Weather")}</p>
        <div className="temp">
          {dailyWeather.length || currentLocationWeather ? (
            <>
              <h1 style={{ color: "gold", textShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}>
                {Math.round(
                  dailyWeather[0]?.main.temp ||
                  currentLocationWeather?.[0]?.temp?.day ||
                  0
                )}°{unit === "imperial" ? "F" : "C"}
              </h1>
              <p style={{ color: "gold" }}>
                Humidity:{" "}
                {dailyWeather[0]?.main.humidity || currentLocationWeather?.[0]?.humidity || 0}%
              </p>
              <p style={{ color: "gold" }}>
                Wind Speed:{" "}
                {dailyWeather[0]?.wind.speed || currentLocationWeather?.[0]?.wind_speed || 0}{" "}
                {unit === "imperial" ? "mph" : "m/s"}
              </p>
            </>
          ) : (
            <h1 style={{ color: "gold" }}>
              Welcome to Phila's Weather Station
            </h1>
          )}
        </div>
        <div className="description">
          <p>
            {dailyWeather[0]?.weather[0]?.description ||
              currentLocationWeather?.[0]?.weather?.[0]?.description || ""}
          </p>
          {dailyWeather[0]?.weather[0]?.icon && (
            <img
              src={getIconUrl(dailyWeather[0].weather[0].icon)}
              alt="Weather icon"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
