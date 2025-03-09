remember it: You must activated the proxy     cors-anywhere.herokuapp.com

1. Go to the activation page:
2. https://cors-anywhere.herokuapp.com/corsdemo
3. Click the "Request temporary access" button.
4. Your proxy will be active again for 24 hours.


Since you are using cors-anywhere.herokuapp.com, manual activation is required every 24 hours.
Key Details:
- Activation is tied to your IP address.
- You must use the same browser (or clear cache & re-activate).
- The activation lasts for 24 hours, after which you need to manually re-enable it.




1. Overview
The proposed system is a multi-page React web application designed to facilitate user authentication, weather data retrieval, and favorite city management. It is a small prototype accessible on multiple platforms using any modern web browser. The application is fully responsive, supporting mobile (320px), tablet (768px), and desktop (1024px+) resolutions. It provides an interactive and engaging user experience for checking the weather and enjoying city views.
The application integrates APIs for weather forecasting and image retrieval, ensuring a dynamic and responsive user interface. Users can search for weather information, view city images, and manage a list of favorite locations. The project showcases best practices in modern web development, including authentication workflows, API integration, and responsive UI design.

2. Core Features
Authentication Module: Implements secure user authentication via Firebase, ensuring access control and session management.
Weather Search Module: Allows users to input a city name, retrieve weather data from the Meteomatics API, and display a corresponding city image via the Google Images API.
Pictures Search Module: Allow users to find the pictures from the city that corresponds to input of user on the route with weather look up.
Favorites Management Module: Enables users to store, view, and remove favorite cities for quick access.
Information Module: Displays project details, technical stack, and system architecture for user reference.

3. Technical Specifications
Frontend Architecture: Developed using React.js, leveraging React Router for seamless multi-page navigation.
Semantic HTML5: Utilizes ARIA-compliant markup for enhanced accessibility and structural clarity.
Responsive UI: Implements CSS Grid and Flexbox for adaptive layout across various screen resolutions.
API Integration: Supports asynchronous data retrieval with loading states and error handling.
State Management: Utilizes React Hooks and Context API for efficient global state handling.
Security Measures: Ensures authentication security via Firebase and proper session validation.

4. Expected Outcome
The system will provide an intuitive, high-performance interface for weather data retrieval and favorite city management. Designed as an interactive, entertaining, and engaging application, it will be accessible across multiple platforms via modern web browsers. The system will implement best practices in:
React development: Ensuring modular and maintainable code structure.
Authentication workflows: Secure and efficient user access control.
API integration: Reliable data retrieval with error handling.
Responsive UI design: Optimal usability across different devices.
Accessibility compliance: Ensuring usability for all users.
By integrating these technologies and design principles, the Tempix application will deliver a seamless and enjoyable user experience.
