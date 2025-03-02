import React, { useState } from "react";
import CitySearch from "./CitySearch__";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"; // ✅ Bypass CORS
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const CityPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(false); // ✅ Loading state

    const getCityPhotos = async (placeId) => {
        if (!placeId) {
            console.warn("❌ No place ID provided to `getCityPhotos`.");
            return;
        }
    
        console.log(`✅ getCityPhotos Called with placeId: ${placeId}`);
               
        
    
        setLoading(true);
    
        const PHOTO_DETAILS_URL = `${CORS_PROXY}https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`;
    
        try {
            console.log(`Fetching photos for place ID: ${placeId}`);
            console.log(`Requesting: ${PHOTO_DETAILS_URL}`);
    
            const response = await fetch(PHOTO_DETAILS_URL);
            if (!response.ok) throw new Error(`Failed to fetch city photos, status: ${response.status}`);
    
            const data = await response.json();
            console.log("Google Photos API Response:", data); // ✅ Log the full response
    
            if (!data.result || !data.result.photos) {
                console.warn("No photos found for place ID:", placeId);
                setPhotos([]);
                setLoading(false);
                return;
            }
    
            const imageUrls = data.result.photos.map(photo =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
            );
    
            console.log("Fetched image URLs:", imageUrls); // ✅ Log URLs
            setPhotos(imageUrls);
        } catch (error) {
            console.error("Error fetching city photos:", error);
            setPhotos([]);
        } finally {
            setLoading(false);
        }
    };
    
       

    return (
        <div>
            <h2>Search for a city</h2>
            <CitySearch onCitySelect={getCityPhotos} />
    
            {loading && <p>Loading photos...</p>}
    
            {photos.length > 0 ? (
                <div>
                    <h3>City Photos</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {photos.map((url, index) => (
                            <img key={index} src={url} alt={`City view`} width="300" />
                        ))}
                    </div>
                </div>
            ) : (
                !loading && <p>No photos available. Please search for a city.</p>
            )}
        </div>
    );
    
    
    

    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
};

export default CityPhotos;
