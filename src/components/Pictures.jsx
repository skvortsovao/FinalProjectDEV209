import React, { useState } from "react";
import "../styles/Pictures.css";

const Pictures = () => {
  const [city, setCity] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch place_id from the Node.js server
  const fetchPlaceId = async (city) => {
    try {
      const response = await fetch(`http://localhost:3000/fetch-place-id?city=${city}`);
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        return data.candidates[0].place_id;
      } else {
        throw new Error("No place found for this city.");
      }
    } catch (error) {
      throw new Error("Error fetching place ID: " + error.message);
    }
  };

  // Function to fetch photos using the place_id
  const fetchCityPhotos = async (placeId) => {
    const apiKey = "AIzaSyBXelX2xErmN30PEAHn8_HaqbN2UPtLxc8";  // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.result && data.result.photos) {
        const photoUrls = data.result.photos.map(photo => 
          `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${apiKey}`
        );
        setImages(photoUrls);
      } else {
        setError("No photos available for this place.");
        setImages([]);
      }
    } catch (error) {
      setError("Error fetching photos: " + error.message);
      setImages([]);
    }
  };

  // Handle search button click
  const handleSearch = async () => {
    setError(null);
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      const placeId = await fetchPlaceId(city);
      await fetchCityPhotos(placeId);
    } catch (error) {
      setError(error.message);
      setImages([]);
    }
  };

  return (
    <div className="pictures-container">
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

      <div className="image-gallery">
        {images.length > 0 ? (
          images.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt={`City photo ${index + 1}`} />
          ))
        ) : (
          !error && <p>Enter a city and click search to see pictures.</p>
        )}
      </div>
    </div>
  );
};

export default Pictures;