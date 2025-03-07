// Proxy to bypass CORS restrictions when making requests to Google APIs
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";

// Google API key (stored in environment variables for security)
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

/**
 * Fetches a `place_id` for a given city using Google Places Autocomplete API.
 * @param {string} cityName - Name of the city to search for.
 * @returns {Promise<string | null>} - Place ID or null if an error occurs.
 */
export const getPlaceId = async (cityName) => {
    const PLACES_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(cityName)}&types=(cities)&key=${API_KEY}`;

    try {
        console.log(`Fetching place ID for: ${cityName}`);
        console.log(`Requesting: ${PLACES_URL}`);

        // Fetch place ID from Google Places API
        const response = await fetch(PLACES_URL);
        if (!response.ok) throw new Error(`Failed to fetch place ID, status: ${response.status}`);

        const data = await response.json();
        console.log("Google API Response:", data);

        // If no predictions found, return null
        if (!data.predictions || data.predictions.length === 0) {
            console.warn("No predictions found for:", cityName);
            return null;
        }

        // Extract the first available place ID
        const placeId = data.predictions[0].place_id;
        console.log("Fetched place ID:", placeId);
        return placeId;
    } catch (error) {
        console.error("Error fetching place ID:", error);
        return null;
    }
};

/**
 * Fetches city photos using the Google Places Details API.
 * @param {string} cityName - Name of the city to get photos for.
 * @returns {Promise<string[]>} - Array of photo URLs or an empty array if an error occurs.
 */
export const getCityPhotos = async (cityName) => {
    // Retrieve place ID first
    const placeId = await getPlaceId(cityName);
    if (!placeId) return [];

    const PHOTO_DETAILS_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;

    try {
        console.log(`Fetching photos for place ID: ${placeId}`);
        console.log(`Requesting: ${PHOTO_DETAILS_URL}`);

        // Fetch photo details from Google Places API
        const response = await fetch(PHOTO_DETAILS_URL);
        if (!response.ok) throw new Error(`Failed to fetch city photos, status: ${response.status}`);

        const data = await response.json();
        console.log("Google Photos API Response:", data);

        // If no photos found, return an empty array
        if (!data.result || !data.result.photos) {
            console.warn("No photos found for place ID:", placeId);
            return [];
        }

        // Generate photo URLs for each photo reference
        return data.result.photos.map(photo =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
        );
    } catch (error) {
        console.error("Error fetching city photos:", error);
        return [];
    }
};
