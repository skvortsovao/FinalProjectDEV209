// Import necessary dependencies
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "../styles/MyAlbum.css";

const MyAlbum = () => {
    // State to store fetched photos
    const [photos, setPhotos] = useState([]);

    // State to track selected photos for deletion
    const [selectedPhotos, setSelectedPhotos] = useState([]);

    // State to manage loading status
    const [loading, setLoading] = useState(false);

    // Hook to detect when the user navigates to "My Album"
    const location = useLocation();

    /**
     * Fetches user photos whenever the component mounts or location changes.
     */
    useEffect(() => {
        if (auth.currentUser) {
            fetchPhotos(auth.currentUser.uid);
        } else {
            console.log("User not authenticated yet.");
        }
    }, [location]);

    /**
     * Fetches all photos for the authenticated user from Firestore.
     * @param {string} userId - The authenticated user's UID.
     */
    const fetchPhotos = async (userId) => {
        setLoading(true);
        if (!userId) {
            console.error("No user logged in!");
            setLoading(false);
            return;
        }

        try {
            console.log("Fetching albums for user:", userId);

            const albumRef = collection(db, "albums");
            const albumSnapshot = await getDocs(albumRef);

            let allPhotos = [];

            // Loop through all albums and fetch associated photos
            for (const albumDoc of albumSnapshot.docs) {
                const albumId = albumDoc.id;
                const albumData = albumDoc.data();

                if (albumData.userId === userId) {
                    console.log("Fetching photos for album:", albumId);

                    const photosRef = collection(db, `albums/${albumId}/photos`);
                    const photoSnapshot = await getDocs(photosRef);

                    const albumPhotos = photoSnapshot.docs.map(photoDoc => ({
                        id: photoDoc.id,
                        imageUrl: photoDoc.data().imageUrl,
                        albumId: albumId
                    }));

                    allPhotos = [...allPhotos, ...albumPhotos];
                }
            }

            setPhotos(allPhotos);
            console.log("Photos fetched successfully:", allPhotos);
        } catch (error) {
            console.error("Error fetching from Firestore:", error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Toggles the selection state of a photo for deletion.
     * @param {string} photoId - The ID of the selected photo.
     */
    const toggleSelection = (photoId) => {
        setSelectedPhotos(prevSelected =>
            prevSelected.includes(photoId)
                ? prevSelected.filter(id => id !== photoId)
                : [...prevSelected, photoId]
        );
    };

    /**
     * Deletes selected photos from Firestore.
     */
    const handleDeleteSelected = async () => {
        if (selectedPhotos.length === 0) return;

        try {
            for (const photoId of selectedPhotos) {
                const photoRef = doc(db, `albums/${photos.find(p => p.id === photoId).albumId}/photos/${photoId}`);
                await deleteDoc(photoRef);
            }

            // Update state to remove deleted photos from the UI
            setPhotos(prevPhotos => prevPhotos.filter(photo => !selectedPhotos.includes(photo.id)));
            setSelectedPhotos([]);
            alert("Selected photos deleted!");
        } catch (error) {
            console.error("Error deleting from Firestore:", error);
            alert("Error deleting selected photos.");
        }
    };

    return (
        <div>
            <h2>My Album</h2>

            {/* Always show "Refresh Photos" button */}
            <div className="button-container">
                <button className="refresh-button" onClick={() => fetchPhotos(auth.currentUser?.uid)} disabled={loading}>
                    {loading ? "Refreshing..." : "Refresh Photos"}
                </button>
                {selectedPhotos.length > 0 && (
                    <button className="delete-button" onClick={handleDeleteSelected}>
                        Delete Selected
                    </button>
                )}
            </div>

            {photos.length > 0 ? (
                <div className="album-container">
                    {photos.map(photo => (
                        <div key={photo.id} className="album-item">
                            <img src={photo.imageUrl} alt="Favorite" />
                            <input
                                type="checkbox"
                                onChange={() => toggleSelection(photo.id)}
                                checked={selectedPhotos.includes(photo.id)}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                auth.currentUser && <p>No pictures saved yet. Click "Refresh Photos" to load images.</p>
            )}
        </div>
    );
};

export default MyAlbum;
