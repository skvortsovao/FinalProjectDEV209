import React, { useState } from "react";
import "../styles/Pictures.css";

// Fetch images from Pexels API
export const fetchCityImages = async (city) => {
  try {
    const apiKey = import.meta.env.VITE_PEXELS_API_KEY; 

    if (!apiKey) {
      console.error("Pexels API Key is missing.");
      return [];
    }

    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=10`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();
    return data.photos || [];
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

const Pictures = () => {
  const [city, setCity] = useState(""); 
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null); // Reset errors

    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    console.log("API Key from .env:", import.meta.env.VITE_PEXELS_API_KEY);

    const fetchedImages = await fetchCityImages(city);
    if (fetchedImages.length === 0) {
      setError("No images found. Try another city.");
    }
    setImages(fetchedImages);
  };

  return (
    <div className="pictures-container">
      <h2>Find Pictures of a City</h2>

      {/* Input field & Search Button */}
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Display Images */}
      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((image) => (
            <img key={image.id} src={image.src.medium} alt={image.photographer} />
          ))
        ) : (
          !error && <p>Enter a city and click search to see pictures.</p>
        )}
      </div>
    </div>
  );
};

export default Pictures;