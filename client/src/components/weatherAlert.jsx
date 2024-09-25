import React from "react";

function WeatherAlert({ weatherAlert }) {
  return (
    weatherAlert && (
      <div className="alert">
        <h3>Weather Alert</h3>
        <p>{weatherAlert.description}</p>
      </div>
    )
  );
}

export default WeatherAlert;
