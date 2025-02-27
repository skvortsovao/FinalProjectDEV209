import { useState, useEffect } from "react";
import { getWeather, getCoordinates } from "../api";
import "../styles/Weather.css";  // Import CSS file

const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchWeather = async () => {
        setError(null);

        if (!city) {
            setError("Please enter a city name!");
            return;
        }

        const coordinates = await getCoordinates(city);
        if (!coordinates) {
            setError("Could not find city. Please try again.");
            return;
        }

        console.log(`Coordinates for ${city}: Lat ${coordinates.lat}, Lon ${coordinates.lon}`);

        const data = await getWeather(coordinates.lat, coordinates.lon);
        if (!data || !data.main) {
            setError("Failed to fetch weather data.");
            return;
        }

        setWeatherData(data);
    };

    // Function to set background image based on weather
    const getBackgroundImage = () => {
        if (!weatherData) return "/default.jpg"; // Default background
    
        const condition = weatherData.weather[0].main.toLowerCase();
        
        if (condition.includes("cloud")) return "/cloudy.jpg";
        if (condition.includes("rain")) return "/rain.jpeg";
        if (condition.includes("clear")) return "/sunny.jpg";
        if (condition.includes("snow")) return "/snow.jpg";
        
        return "/default.jpg"; // Default if no match
    };

    // Apply background image to body dynamically
    useEffect(() => {
        document.body.style.backgroundImage = `url(${getBackgroundImage()})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed";
    }, [weatherData]);

    return (
        <div className="weather-container">
            <h1>Welcome to Tempix</h1>

            {/* ✅ Group input and button in one row */}
            <div className="input-group">
                <input 
                    type="text" 
                    placeholder="Enter City Name" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={handleFetchWeather}>Get Weather</button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {weatherData && weatherData.main && (
                <div className="weather-info">
                    <h3>Weather in {weatherData.name}</h3>
                    <p><strong>Temperature:</strong> {weatherData.main.temp}°C</p>
                    <p><strong>Feels Like:</strong> {weatherData.main.feels_like}°C</p>
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                    <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}/>
                </div>
            )}
        </div>
    );
};

export default Weather;
