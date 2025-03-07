// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { getWeather, getCoordinates } from "../api";
import "../styles/Weather.css"; 

const Weather = ({ setSelectedCity }) => {
  // State to store the city name entered by the user
  const [city, setCity] = useState("");

  // State to store fetched weather data
  const [weatherData, setWeatherData] = useState(null);

  // State to store error messages if the request fails
  const [error, setError] = useState(null);

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
      {error && <p className="error-message">{error}</p>}

      {/* Display weather data if available */}
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
    </div>
  );
};

export default Weather;
