const API_KEY = "6b1fde950d44075d8b55708174adb5c7";  // My OpenWeather API key
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct"; // taking geo coordinates
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";  // Free API

/**
 * Get latitude and longitude from a city name using OpenWeather Geocoding API
 */
export const getCoordinates = async (city) => {
    const endpoint = `${GEO_BASE_URL}?q=${city}&limit=1&appid=${API_KEY}`;

    try {
        console.log(`Fetching coordinates for city: ${city}`);  // Debugging

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch coordinates: ${response.status}`);

        const data = await response.json();
        console.log("Geocoding API response:", data);  // Debugging

        if (!data || data.length === 0) {
            throw new Error("City not found");
        }

        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
        console.error("Error getting coordinates:", error);
        return null;
    }
};

/**
 * Get weather data from OpenWeather Free API
 */
export const getWeather = async (latitude, longitude) => {
    const endpoint = `${WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};


































