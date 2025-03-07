// Import necessary dependencies
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; 
import { auth, db } from "../firebase"; 
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import "../styles/Pictures.css";

// Google Places API configuration
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
const CORS_PROXY = "https://api.allorigins.win/get?url=";

const Pictures = ({ city }) => {
    // State for storing fetched photos
    const [photos, setPhotos] = useState([]); 

    // State for tracking loading status
    const [loading, setLoading] = useState(false);

    // State for storing selected photos before saving
    const [selectedPhotos, setSelectedPhotos] = useState([]); 

    // Hook for navigation after saving
    const navigate = useNavigate(); 

    /**
     * Fetches city photos using Google Places API when the `city` prop changes.
     */
    useEffect(() => {
        if (!city) return;

        setLoading(true);
        console.log(`Fetching photos for: ${city}`);

        const fetchCityPhotos = async () => {
            try {
                // Fetch Place ID from Google Places API
                const PLACE_ID_URL = `${CORS_PROXY}${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${city}&types=(cities)&key=${GOOGLE_API_KEY}`)}`;
                const placeResponse = await fetch(PLACE_ID_URL);
                if (!placeResponse.ok) throw new Error("Failed to fetch place ID");

                const placeDataRaw = await placeResponse.json();
                const placeData = JSON.parse(placeDataRaw.contents);

                if (!placeData.predictions || placeData.predictions.length === 0) {
                    console.warn("No place ID found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                const placeId = placeData.predictions[0].place_id;

                // Fetch photos using Place ID
                const PHOTO_DETAILS_URL = `${CORS_PROXY}${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${GOOGLE_API_KEY}`)}`;
                const photoResponse = await fetch(PHOTO_DETAILS_URL);
                if (!photoResponse.ok) throw new Error("Failed to fetch city photos");

                const photoDataRaw = await photoResponse.json();
                const photoData = JSON.parse(photoDataRaw.contents);

                if (!photoData.result || !photoData.result.photos) {
                    console.warn("No photos found for:", city);
                    setPhotos([]);
                    setLoading(false);
                    return;
                }

                // Extract and store image URLs
                const imageUrls = photoData.result.photos.map(photo =>
                    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`
                );

                setPhotos(imageUrls);
            } catch (error) {
                console.error("Error fetching city photos:", error);
                setPhotos([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCityPhotos();
    }, [city]);

    /**
     * Toggles photo selection for saving to the album.
     * @param {string} url - The URL of the photo to be selected or deselected.
     */
    const toggleSelection = (url) => {
        setSelectedPhotos((prev) =>
            prev.includes(url) ? prev.filter((photo) => photo !== url) : [...prev, url] 
        );
    };

    /**
     * Saves selected photos to Firestore, ensuring each user has their own album.
     */
    const saveToFirebase = async () => {
        const user = auth.currentUser;
        if (!user) {
            alert("You must be logged in to save photos!");
            return;
        }

        if (selectedPhotos.length === 0) {
            alert("No pictures selected!");
            return;
        }

        console.log("Selected Photos Before Saving:", selectedPhotos);

        try {
            console.log("Firestore DB Instance:", db);

            let albumId = null;

            // Check if the user already has an album in Firestore
            const albumRef = collection(db, "albums");
            const q = query(albumRef, where("userId", "==", user.uid));
            const albumSnapshot = await getDocs(q);

            if (!albumSnapshot.empty) {
                // Use the existing album
                albumId = albumSnapshot.docs[0].id;
                console.log("Existing Album Found: ", albumId);
            } else {
                // Create a new album if one does not exist
                const newAlbum = await addDoc(albumRef, { 
                    userId: user.uid, 
                    createdAt: new Date().toISOString()
                });
                albumId = newAlbum.id;
                console.log("New Album Created: ", albumId);
            }

            // Store selected photos in the album's `photos` subcollection
            for (const photoUrl of selectedPhotos) {
                await addDoc(collection(db, `albums/${albumId}/photos`), {
                    imageUrl: photoUrl,
                    uploadedAt: new Date().toISOString(),
                });
            }

            console.log("Successfully saved to Firestore:", selectedPhotos);
            alert("Saved to My Album!");
            navigate("/layout/my-album");
        } catch (error) {
            console.error("Firestore Error:", error.message);
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
                                ★
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p>No photos available. Please search for a city.</p>
            )}

            {selectedPhotos.length > 0 && (
                <button className="save-button" onClick={saveToFirebase}>
                    Save and View My Album
                </button>
            )}
        </div>
    );
};

// Define expected prop types
Pictures.propTypes = {
    city: PropTypes.string.isRequired,
};

export default Pictures;
