import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Validate props

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
// 
const Pictures = ({ city }) => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        console.log(`📸 Fetching photos for: ${city}`);

        const fetchCityPhotos = async () => {
            try {
                // ✅ Get place_id for the city
                const PLACE_ID_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(city)}&types=(cities)&key=${GOOGLE_API_KEY}`;
                console.log(`🔗 Requesting Place ID: ${PLACE_ID_URL}`);

                const placeResponse = await fetch(PLACE_ID_URL);
                if (!placeResponse.ok) throw new Error("❌ Failed to fetch place ID");

                const placeData = await placeResponse.json();
                console.log("📌 Place API Response:", placeData);

                if (!placeData.predictions || placeData.predictions.length === 0) {
                    console.warn("⚠ No place ID found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                const placeId = placeData.predictions[0].place_id;
                console.log("✅ Fetched place ID:", placeId);

                // ✅ Fetch city photos using the place_id
                const PHOTO_DETAILS_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
                console.log(`🔗 Requesting City Photos: ${PHOTO_DETAILS_URL}`);

                const photoResponse = await fetch(PHOTO_DETAILS_URL);
                if (!photoResponse.ok) throw new Error("❌ Failed to fetch city photos");

                const photoData = await photoResponse.json();
                console.log("📌 Google Photos API Response:", photoData);

                if (!photoData.result || !photoData.result.photos) {
                    console.warn("⚠ No photos found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                // ✅ Generate correct image URLs
                const imageUrls = photoData.result.photos.map(photo =>
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
                );

                console.log("✅ Fetched image URLs:", imageUrls);
                setPhotos(imageUrls);
            } catch (error) {
                console.error("❌ Error fetching city photos:", error);
                setPhotos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCityPhotos();
    }, [city]);

    return (
        <div>
            <h2>Photos of {city || "No City Selected"}</h2>
            {loading && <p>Loading photos...</p>}
    
            {photos.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                    {photos.map((url, index) => {
                        console.log(`🖼️ Rendering image ${index + 1}:`, url); // ✅ Log each image URL
                        return (
                            <img 
                                key={index} 
                                src={url} 
                                alt={`View of ${city}`} 
                                style={{ width: "200px", height: "auto", borderRadius: "10px" }} 
                            />
                        );
                    })}
                </div>
            ) : (
                !loading && <p>No photos available. Please search for a city.</p>
            )}
        </div>
    );

    
    
    
    
};

// ✅ Prop validation
Pictures.propTypes = {
    city: PropTypes.string.isRequired,
};

export default Pictures;
