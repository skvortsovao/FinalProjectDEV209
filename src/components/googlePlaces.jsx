const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // ✅ Load API Key securely

// ✅ Function to get `place_id` from a city name
export const getPlaceId = async (cityName) => {
    const PLACES_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(cityName)}&types=(cities)&key=${API_KEY}`;

    try {
        console.log(`Fetching place ID for: ${cityName}`);
        console.log(`Requesting: ${PLACES_URL}`);

        const response = await fetch(PLACES_URL);
        if (!response.ok) throw new Error(`Failed to fetch place ID, status: ${response.status}`);

        const data = await response.json();
        console.log("Google API Response:", data);

        if (!data.predictions || data.predictions.length === 0) {
            console.warn("No predictions found for:", cityName);
            return null;
        }

        const placeId = data.predictions[0].place_id;
        console.log("Fetched place ID:", placeId);
        return placeId;
    } catch (error) {
        console.error("Error fetching place ID:", error);
        return null;
    }
};

// ✅ Function to get city photos using `place_id`
export const getCityPhotos = async (cityName) => {
    const placeId = await getPlaceId(cityName);
    if (!placeId) return [];

    const PHOTO_DETAILS_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${API_KEY}`;

    try {
        console.log(`Fetching photos for place ID: ${placeId}`);
        console.log(`Requesting: ${PHOTO_DETAILS_URL}`);

        const response = await fetch(PHOTO_DETAILS_URL);
        if (!response.ok) throw new Error(`Failed to fetch city photos, status: ${response.status}`);

        const data = await response.json();
        console.log("Google Photos API Response:", data);

        if (!data.result || !data.result.photos) {
            console.warn("No photos found for place ID:", placeId);
            return [];
        }

        return data.result.photos.map(photo =>
            `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${API_KEY}`
        );
    } catch (error) {
        console.error("Error fetching city photos:", error);
        return [];
    }
};
