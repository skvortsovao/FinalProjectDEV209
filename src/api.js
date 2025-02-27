const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const GEO_BASE_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const GOOGLE_STREET_VIEW_BASE_URL = "https://maps.googleapis.com/maps/api/streetview";

/**
 * Get latitude and longitude from a city name using OpenWeather Geocoding API
 */
export const getCoordinates = async (city) => {
    const endpoint = `${GEO_BASE_URL}?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`;

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
    if (!OPENWEATHER_API_KEY) {
        console.error("Missing OpenWeather API Key!");
        return null;
    }

    const endpoint = `${WEATHER_BASE_URL}?lat=${latitude}&lon=${longitude}&units=metric&appid=${OPENWEATHER_API_KEY}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        return response.json();
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
};

/**
 * Get 4 Street View images for a city (Front, Back, Left, Right)
 */
export const getStreetViewImages = async (city) => {
    if (!GOOGLE_API_KEY) {
        console.error("Missing Google API Key!");
        return [];
    }

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
