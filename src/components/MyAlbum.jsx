import React from "react";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation
import "../styles/MyAlbum.css"; // ✅ Import styles

const MyAlbum = () => {
    const location = useLocation();
    const selectedPhotos = location.state?.selectedPhotos || []; // ✅ Retrieve passed data

    return (
        <div>
            <h2>My Album</h2>
            {selectedPhotos.length > 0 ? (
                <div className="album-container">
                    {selectedPhotos.map((url, index) => (
                        <div key={index} className="album-item">
                            <img src={url} alt="Favorite" />
                        </div>
                    ))}
                </div>
            ) : (
                <p>No pictures added to the album.</p>
            )}
        </div>
    );
};

export default MyAlbum;
