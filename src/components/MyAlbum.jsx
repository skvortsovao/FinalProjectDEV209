import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "../styles/MyAlbum.css"; // ✅ Add grid styling

const MyAlbum = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhotos, setSelectedPhotos] = useState([]); // ✅ State for checkboxes

    // ✅ Fetch images from Firestore on mount
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const albumRef = collection(db, "albums");
                const snapshot = await getDocs(albumRef);
                
                if (!snapshot.empty) {
                    const albumPhotos = snapshot.docs.map(doc => ({
                        id: doc.id,
                        urls: doc.data().photos || [] // ✅ Get photos array
                    }));
                    setPhotos(albumPhotos);
                }
            } catch (error) {
                console.error("❌ Error fetching from Firebase:", error);
            }
        };
        fetchPhotos();
    }, []);

    // ✅ Handle checkbox selection
    const handleCheckboxChange = (photoId, url) => {
        setSelectedPhotos(prevSelected =>
            prevSelected.some(item => item.id === photoId && item.url === url)
                ? prevSelected.filter(item => !(item.id === photoId && item.url === url))
                : [...prevSelected, { id: photoId, url }]
        );
    };

    // ✅ Delete selected images
    const handleDeleteSelected = async () => {
        if (selectedPhotos.length === 0) return;

        try {
            for (const { id, url } of selectedPhotos) {
                // Find the document in Firestore that contains the image
                const albumRef = doc(db, "albums", id);
                const albumDoc = await getDocs(collection(db, "albums"));

                const docData = albumDoc.docs.find(d => d.id === id);
                if (docData) {
                    const updatedPhotos = docData.data().photos.filter(photo => photo !== url);
                    if (updatedPhotos.length > 0) {
                        await updateDoc(albumRef, { photos: updatedPhotos });
                    } else {
                        await deleteDoc(albumRef); // Delete document if no photos left
                    }
                }
            }

            // ✅ Update state after deletion
            setPhotos(prevPhotos =>
                prevPhotos.map(album => ({
                    ...album,
                    urls: album.urls.filter(url => !selectedPhotos.some(item => item.url === url))
                })).filter(album => album.urls.length > 0)
            );

            setSelectedPhotos([]); // ✅ Clear selection after deleting
            alert("✅ Selected photos deleted!");
        } catch (error) {
            console.error("❌ Error deleting from Firestore:", error);
            alert("❌ Error deleting selected photos.");
        }
    };

    return (
        <div>
            <h2>My Album</h2>
            
            {/* ✅ Show Delete Button only if at least one checkbox is checked */}
            {selectedPhotos.length > 0 && (
                <button className="delete-button" onClick={handleDeleteSelected}>
                    Delete Selected
                </button>
            )}

            {photos.length > 0 ? (
                <div className="album-container">
                    {photos.map(album =>
                        album.urls.map((url, index) => (
                            <div key={index} className="album-item">
                                <img src={url} alt="Favorite" />
                                <input
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(album.id, url)}
                                    checked={selectedPhotos.some(item => item.id === album.id && item.url === url)}
                                />
                            </div>
                        ))
                    )}
                </div>
            ) : (
                <p>No pictures saved yet.</p>
            )}
        </div>
    );
};

export default MyAlbum;
