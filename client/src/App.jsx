// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const API_KEY = 'YOUR_ACTUAL_OPENWEATHERMAP_API_KEY';const lat = 51.5074; // Replace with your latitude
// const lon = -0.1278; // Replace with your longitude

// const App = () => {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [hourlyWeather, setHourlyWeather] = useState([]); // Update this line

//   useEffect(() => {
//     fetchWeatherData();
//   }, []);

//   const fetchWeatherData = async () => {
//     try {
//       // Fetch hourly weather forecast using Hourly Forecast API
//       const response = await axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
//       setCurrentWeather({
//         name: 'London',
//         temp: response.data.list[0].main.temp,
//         description: response.data.list[0].weather[0].description,
//       });
//       setHourlyWeather(response.data.list);
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//     }
//   };

//   const appStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     margin: '20px',
//     fontFamily: 'Arial, sans-serif',
//   };

//   const currentWeatherStyle = {
//     margin: '10px',
//     padding: '20px',
//     border: '1px solid #ddd',
//     borderRadius: '5px',
//     textAlign: 'center',
//   };

//   const weeklyWeatherStyle = {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     margin: '10px',
//   };

//   const weatherCardStyle = {
//     border: '1px solid #ddd',
//     padding: '10px',
//     margin: '5px',
//     width: '150px',
//     borderRadius: '5px',
//     textAlign: 'center',
//     backgroundColor: '#f9f9f9',
//   };

//   return (
//     <div style={appStyle}>
//       <div style={currentWeatherStyle}>
//         {currentWeather ? (
//           <div>
//             <h2>{currentWeather.name}</h2>
//             <p>Temperature: {Math.round(currentWeather.temp)}°C</p>
//             <p>Condition: {currentWeather.description}</p>
//           </div>
//         ) : (
//           <p>Loading current weather...</p>
//         )}
//       </div>
//       <div style={weeklyWeatherStyle}>
//         {hourlyWeather.length > 0 ? ( // Update this line
//           hourlyWeather.map((day, index) => ( // Update this line
//             <div key={index} style={weatherCardStyle}>
//               <h3>{new Date(day.dt * 1000).toLocaleDateString()}</h3>
//               <p>Temperature: {Math.round(day.temp.day)}°C</p>
//               <p>Condition: {day.weather[0].description}</p>
//             </div>
//           ))
//         ) : (
//           <p>Loading weekly weather...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;
import React, {useState} from "react";
import axios from "axios";

function App(){

  const [data, setData] = useState({});
  const [location,  setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?p=dallas&appid=0d60273acd621b755f1317978b6f426a`
   const searchLocation =  async () => {
    if (event.key  === 'Enter') {

    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    })
    setLocation('')
  }
    }

  return (
  <div className="app">
    <div className="search">
      <input 
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      onKeyPress={searchLocation}
      placeholder="Enter  location"
      type="text"
      />

    </div>
    <div className="container">
      <div className="top">
        <div className="location">
          <p>London</p>
          <div className="temp">
            <h1>60 F</h1>
          </div>
          <div className="description">
            <p>clouds</p>
          </div>
        </div>
      </div>

      <div className="bottom">
        <div className="feels">
          <p className="bold">65 F</p>
          <p>Feels like</p>
        </div>

        <div className="humidity">
          <p className="bold">20%</p>
          <p>Humidity</p>
        </div>

        <div className="wind">
          <p className="bold">12 MPH</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>

  </div>
)}
export default App