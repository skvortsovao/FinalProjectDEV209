import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { db } from "../firebase"; // ✅ Import Firestore
import { collection, addDoc } from "firebase/firestore"; // ✅ Import Firestore functions
import "../styles/Pictures.css"; // ✅ Import styles

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CORS_PROXY = "https://api.allorigins.win/get?url=";

const Pictures = ({ city }) => {
    const [photos, setPhotos] = useState([]); // ✅ State for storing images
    const [loading, setLoading] = useState(false); // ✅ State for loading
    const [selectedPhotos, setSelectedPhotos] = useState([]); // ✅ State for selected images
    const navigate = useNavigate(); // ✅ Initialize React Router navigation

    useEffect(() => {
        if (!city) return;

        setLoading(true);
        console.log(`📡 Fetching photos for: ${city}`);

        const fetchCityPhotos = async () => {
            try {
                // 🔹 Get place_id for the city
                const PLACE_ID_URL = `${CORS_PROXY}${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${GOOGLE_API_KEY}`)}`;
                console.log(`🔗 Requesting Place ID: ${PLACE_ID_URL}`);

                const placeResponse = await fetch(PLACE_ID_URL);
                if (!placeResponse.ok) throw new Error("❌ Failed to fetch place ID");

                const placeDataRaw = await placeResponse.json();
                const placeData = JSON.parse(placeDataRaw.contents);
                console.log("✅ Place API Response:", placeData);

                if (!placeData.predictions || placeData.predictions.length === 0) {
                    console.warn("⚠ No place ID found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                const placeId = placeData.predictions[0].place_id;
                console.log("✅ Fetched place ID:", placeId);

                // 🔹 Fetch city photos using the place_id
                const PHOTO_DETAILS_URL = `${CORS_PROXY}${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`)}`;
                console.log(`🔗 Requesting City Photos: ${PHOTO_DETAILS_URL}`);

                const photoResponse = await fetch(PHOTO_DETAILS_URL);
                if (!photoResponse.ok) throw new Error("❌ Failed to fetch city photos");

                const photoDataRaw = await photoResponse.json();
                const photoData = JSON.parse(photoDataRaw.contents);
                console.log("✅ Google Photos API Response:", photoData);

                if (!photoData.result || !photoData.result.photos) {
                    console.warn("⚠ No photos found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                // 🔹 Generate correct image URLs
                const imageUrls = photoData.result.photos.map(photo =>
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
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

    // ✅ Toggle selection for images
    const toggleSelection = (url) => {
        setSelectedPhotos((prev) =>
            prev.includes(url)
                ? prev.filter((photo) => photo !== url) // Remove if already selected
                : [...prev, url] // Add if not selected
        );
    };

    const saveToFirebase = async () => {
        if (selectedPhotos.length === 0) {
            alert("No pictures selected!");
            return;
        }
    
        console.log("📸 Selected Photos Before Saving:", selectedPhotos);
    
        try {
            console.log("🛠 Firestore DB Instance:", db);  // ✅ Log Firestore DB
    
            const albumRef = collection(db, "albums");
            const docRef = await addDoc(albumRef, { photos: selectedPhotos });
    
            console.log("✅ Successfully saved to Firestore:", selectedPhotos);
            console.log("🔥 Firestore Document ID:", docRef.id);  // ✅ Log document ID
    
            alert("Saved to My Album!");
            navigate("/layout/my-album");
        } catch (error) {
            console.error("❌ Firestore Error:", error.message);
            alert("Error saving pictures. Check console logs.");
        }
    };
               
    return (
        <div>
            <h2>Photos of {city || "No City Selected"}</h2>
            {loading && <p>Loading photos...</p>}

            {photos.length > 0 ? (
                <div className="pictures-container">
                    {photos.map((url, index) => (
                        <div key={index} className="picture-item">
                            <img src={url} alt={`View of ${city}`} referrerPolicy="no-referrer" />
                            <button
                                className={`favorite-button ${selectedPhotos.includes(url) ? "active" : ""}`}
                                onClick={() => toggleSelection(url)}
                            >
                                ★ {/* Star emoji */}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No photos available. Please search for a city.</p>
            )}

            {/* ✅ Save button */}
            {selectedPhotos.length > 0 && (
                <button className="save-button" onClick={saveToFirebase}>
                    Save and View My Album
                </button>
            )}
        </div>
    );
};

// ✅ Prop validation
Pictures.propTypes = {
    city: PropTypes.string.isRequired,
};

export default Pictures;


