export const fetchCityImages = async (city) => {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY; 
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=10`;
  
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`, 
      },
    });
  
    if (!response.ok) {
      throw new Error("Error fetching images");
    }
  
    const data = await response.json();
    return data.photos; 
  };