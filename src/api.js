const API_KEY = "6b1fde950d44075d8b55708174adb5c7";  // My OpenWeather API key
const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct"; // taking geo coordinates
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"; // Free API




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


const GOOGLE_STREET_VIEW_BASE_URL = import.meta.env.REACT_APP_GOOGLE_STREET_VIEW_BASE_URL_ENV;
const GOOGLE_API_KEY = import.meta.env.REACT_APP_GOOGLE_API_KEY_ENV;

/**
 * Get 4 Street View images for a city (Front, Back, Left, Right)
 */
export const getStreetViewImages = async (city) => {
    try {
        const coordinates = await getCoordinates(city);
        if (!coordinates) throw new Error("Coordinates not found");

        const { lat, lon } = coordinates;

        // Generate 4 views: Front (0°), Right (90°), Back (180°), Left (270°)
        const headings = [0, 90, 180, 270];
        const imageUrls = headings.map(heading => 
            `${GOOGLE_STREET_VIEW_BASE_URL}?size=1024x768&location=${lat},${lon}&heading=${heading}&key=${GOOGLE_API_KEY}`
        );

        console.log("Generated Street View URLs:", imageUrls);
        return imageUrls;
    } catch (error) {
        console.error("Error fetching Street View images:", error);
        return [];
    }
};




















































