// OpenWeather API key (stored in environment variables for security)
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;  

// Base URLs for OpenWeather API endpoints
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct"; // Geocoding API to get city coordinates
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // Weather API to get weather data

/**
 * Fetches latitude and longitude for a given city name using the OpenWeather Geocoding API.
 * @param {string} city - The name of the city to search for.
 * @returns {Promise<{lat: number, lon: number} | null>} - Coordinates or null if an error occurs.
 */
export const getCoordinates = async (city) => {
    const endpoint = `${GEO_BASE_URL}?q=${city}&limit=1&appid=${API_KEY}`;

    try {
        console.log(`Fetching coordinates for city: ${city}`); 

        // Fetch city coordinates
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Failed to fetch coordinates: ${response.status}`);

        const data = await response.json();
        console.log("Geocoding API response:", data);  

        // If no data is found, return an error
        if (!data || data.length === 0) {
            throw new Error("City not found");
        }

        // Return latitude and longitude of the first result
        return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
        console.error("Error getting coordinates:", error);
        return null;
    }
};

/**
 * Fetches weather data for a given latitude and longitude using the OpenWeather API.
 * @param {number} latitude - Latitude of the location.
 * @param {number} longitude - Longitude of the location.
 * @returns {Promise<Object | null>} - Weather data object or null if an error occurs.
 */
export const getWeather = async (latitude, longitude) => {
    const endpoint = `${WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
   
    try {
        // Fetch weather data
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return response.json(); // Return parsed JSON response
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};
