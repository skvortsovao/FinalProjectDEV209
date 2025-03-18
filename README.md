Tempix – Your Global Weather, City & Music Explorer

===========================================================================================
was made by Oleksandra Skvortsova and Henadzi(Henry) Kirykovich for the DEV209's class
===========================================================================================

Tempix is a modern, feature-rich weather application that provides real-time weather updates for any location worldwide, including famous cities. In addition to weather forecasts, Tempix enhances your experience with:

Stunning images of selected cities
Music that adapts to the current weather and season
Google Authentication for personalized access
Google Autocomplete for easy location search


- Check the working app: [Tempix Live](https://templix.tech/)
- Download the source code: [GitHub Repository](https://github.com/skvortsovao/FinalProjectDEV209)

============================================================================================
Key's Features

1. Global Weather Tracking – Get real-time weather data for any city worldwide
2. Famous Cities Support – Quickly check weather conditions in the most popular travel destinations
3. City Images – View high-quality images of the searched city
4. Music Based on Weather & Season – Listen to background music that matches the current climate
5. Save Favorite Images – Keep and revisit your most loved city pictures
6. Google Authentication – Secure login via Google API
7. Google Autocomplete – Easily search for locations with Google Places API
7. CORS Proxy for API Requests – Bypass CORS issues with cors-anywhere.herokuapp.com
8. Deployed on AWS EC2 – High-performance cloud deployment

===========================================================================================

Tech Stack

- Frontend: React.js
- Backend: Firebase
- Weather Data: OpenWeather API
- Images & Places: Google Places API, Google Photos API
- Music Background: audio based on current weather and season
- Authentication: Google OAuth API
- UI Styling: CSS
- Proxy to Bypass CORS: https://cors-anywhere.herokuapp.com/
- Deployment: AWS EC2

===========================================================================================
Installation, using prog

1. Clone the Repository
git clone https://github.com/skvortsovao/FinalProjectDEV209.git

cd /yourPath/FinalProjectDEV209


2. Install Dependencies

npm install


3. Set Up your API Keys

Create a .env file in the root folder and add your API keys:

VITE_OPENWEATHER_API_KEY=your_openweather_key 

VITE_GOOGLE_API_KEY=your_google_auth_key

VITE_APP_FIREBASE_API_KEY=your_Firebase_auth_key
VITE_APP_FIREBASE_AUTH_DOMAIN=from your Firebase
VITE_APP_FIREBASE_PROJECT_ID=from your Firebase
VITE_APP_FIREBASE_STORAGE_BUCKET=from your Firebase
VITE_APP_FIREBASE_MESSAGING_SENDER_ID=from your Firebase
VITE_APP_FIREBASE_APP_ID=from your Firebase


4. Run the App Locally

    npm run dev

The app will open at http://localhost:5173 (by default but possible change port)


5. To make it more precise put the city's name, comma, 2-letter country code (ISO3166). 
You will get all proper cities in chosen country. 
The order is important - the first is city name then comma then country. Example - London, GB or New York, US.

===========================================================================================
Live Demo

Try it out: https://templix.tech/
===========================================================================================
License
This project is licensed under the MIT License.
===========================================================================================
Current Limitations

Google API Restrictions

If the proxy is down, Google API requests may fail.
Switching to corsproxy.io or setting up a backend proxy is recommended.
OpenWeather API updates data every few minutes, so real-time data may not always be 100% accurate.

==============================================================================================