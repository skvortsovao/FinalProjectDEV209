// Import necessary dependencies
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";  // Check // This defines the expected types for the Weather component's props 
import { getWeather, getCoordinates } from "../api"; //  Functions from api.js to fetch weather data.
import "../styles/Weather.css"; 

import cloudySound from "/public/sound/windy.mp3";
import rainSound from "/public/sound/rain.mp3";
import sunnySound from "/public/sound/summer.mp3";
import snowSound from "/public/sound/thunderstorm.mp3";


const Weather = ({ setSelectedCity }) => {
  // State to store the city name entered by the user
  const [city, setCity] = useState("");

  // State to store fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // State to store error messages if the request fails
  const [error, setError] = useState(null);
  
  const audioRef = useRef(null); // Reference for audio playback


  /**
   * Handles fetching weather data when the user clicks "Get Weather".
   */
  const handleFetchWeather = async () => {
    setError(null); // Clear previous errors

    // Validate that a city name is entered
    if (!city) {
      setError("Please enter a city name!");
      return;
    }

    // Fetch latitude and longitude for the city using OpenWeather API
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      setError("Could not find city. Please try again.");
      return;
    }

    console.log(`Coordinates for ${city}: Lat ${coordinates.lat}, Lon ${coordinates.lon}`);

    // Fetch weather data using coordinates
    const data = await getWeather(coordinates.lat, coordinates.lon);
    if (!data || !data.main) {
      setError("Failed to fetch weather data.");
      return;
    }

    // Store the weather data in state
    setWeatherData(data);

    // Pass the selected city name to the App component
    setSelectedCity(city);
  };

  /**
   * Determines the background image based on the weather condition.
   */
  const getBackgroundImage = () => {
    if (!weatherData) return "/default.jpg";

    const condition = weatherData.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) return "/cloudy.jpg";
    if (condition.includes("rain")) return "/rain.jpeg";
    if (condition.includes("clear")) return "/sunny.jpg";
    if (condition.includes("snow")) return "/snow.jpg";

    return "/default.jpg";
  };

  // Determine background sound based on weather condition
const getBackgroundSound = () => {
    if (!weatherData) return null;

    const condition = weatherData.weather[0].main.toLowerCase();

    if (condition.includes("cloud")) return cloudySound;
    if (condition.includes("rain")) return rainSound;
    if (condition.includes("clear")) return sunnySound;
    if (condition.includes("snow")) return snowSound;

    return null;   
};

// Update background image and sound when weather changes
useEffect(() => {
  document.body.style.backgroundImage = `url(${getBackgroundImage()})`; // changing background use Direct DOM Style Manipulation".

  const soundFile = getBackgroundSound();

  if (soundFile && audioRef.current) {
    audioRef.current.src = soundFile;
    audioRef.current.play().catch((err) => console.error("Audio playback error:", err));
  }
}, [weatherData]);


  /**
   * Updates the background image whenever weather data changes.
   */
  useEffect(() => {
    document.body.style.backgroundImage = `url(${getBackgroundImage()})`;
  }, [weatherData]);

  return (
    <div className="weather-container">
      {/* Input field for entering city name */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state when input changes
        />
        <button onClick={handleFetchWeather}>Get Weather</button>
      </div>

                         
      {/* Display error message if any */}
      {error && <p className="error-message">{error}</p>}    {/*This is a conditional rendering technique in React - only displays the error message if error is not null or false */}

      {/* Display weather data if available */} {/*weatherData.main is a property in the OpenWeather API response that contains temperature-related data. The condition weatherData && weatherData.main && (...) ensures the app doesn’t crash if weatherData is null or undefined */}
      {weatherData && weatherData.main && (       
        <div className="weather-info">
          <h3>Weather in {weatherData.name}</h3>
          <p><strong>Temperature:</strong> {weatherData.main.temp}°F</p>
          <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°F</p>
          <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
          <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
      {/* Background audio element */}
      <audio ref={audioRef} loop />
    </div>
  );
};
Weather.propTypes = {
  setSelectedCity: PropTypes.func.isRequired, // part of PropTypes checking what was pass inside function
};

export default Weather;

