import React, { useState } from "react";
import PropTypes from "prop-types"; // ✅ Import prop-types

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const CitySearch = ({ onCitySelect }) => {
    const [city, setCity] = useState("");

    const getPlaceId = async (cityName) => {
        if (!cityName.trim()) {
            console.warn("⚠ No city name entered.");
            return;
        }

        const PLACES_URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(cityName)}&types=(cities)&key=${GOOGLE_API_KEY}`;
    
        try {
            console.log(`🔍 Fetching place ID for: ${cityName}`);
            console.log(`🔗 Requesting: ${PLACES_URL}`);

            const response = await fetch(PLACES_URL);
            if (!response.ok) throw new Error("❌ Failed to fetch place ID");

            const data = await response.json();
            console.log("📌 Google API Response:", data);

            if (!data.predictions || data.predictions.length === 0) {
                console.warn("⚠ No predictions found for:", cityName);
                return;
            }

            const placeId = data.predictions[0].place_id;
            console.log("✅ Fetched place ID:", placeId);
            onCitySelect(placeId); // ✅ Send to `CityPhotos.jsx`
        } catch (error) {
            console.error("❌ Error fetching place ID:", error);
        }
    };

    const handleSearch = () => {
        if (city.trim() !== "") {
            getPlaceId(city);
        }
    };

    // ✅ Allow pressing "Enter" to trigger search
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyPress={handleKeyPress} // ✅ Handle Enter key
                placeholder="Enter city name"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

// ✅ Define prop types for validation
CitySearch.propTypes = {
    onCitySelect: PropTypes.func.isRequired, // `onCitySelect` must be a function
};

export default CitySearch;
