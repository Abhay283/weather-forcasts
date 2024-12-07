// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [cropType, setCropType] = useState('');
  const [insights, setInsights] = useState([]);

  const cropRecommendations = {
    rice: {
      temp: { min: 22, max: 30 },
      humidity: { min: 80 },
      condition: 'Rice grows well in warm and humid conditions.',
    },
    wheat: {
      temp: { min: 10, max: 20 },
      humidity: { min: 50 },
      condition: 'Wheat grows best in moderate temperatures with low humidity.',
    },
    corn: {
      temp: { min: 18, max: 30 },
      humidity: { min: 60 },
      condition: 'Corn thrives in warm temperatures with moderate humidity.',
    },
  };

  // Fetch current weather data
  const getWeatherData = async (location) => {
    try {
      const response = await axios.get(`http://localhost:5000/weather/${location}`);
      setWeather(response.data);
      getForecastData(location);
    } catch (error) {
      toast.error('Error fetching weather data');
    }
  };

  // Fetch forecast data (daily forecast)
  const getForecastData = async (location) => {
    try {
      const response = await axios.get(`http://localhost:5000/forecast/${location}`);
      setForecast(response.data.list);
    } catch (error) {
      toast.error('Error fetching forecast data');
    }
  };

  // Assess crop-specific recommendations
  const assessCropInsights = (cropType, weatherData) => {
    if (!cropRecommendations[cropType]) return;

    const crop = cropRecommendations[cropType];
    let insightsList = [];

    // Check if temperature is suitable for the crop
    if (
      weatherData.main.temp >= crop.temp.min &&
      weatherData.main.temp <= crop.temp.max
    ) {
      insightsList.push(`Temperature is ideal for ${cropType}.`);
    } else {
      insightsList.push(`Temperature is not ideal for ${cropType}.`);
    }

    // Check if humidity is suitable for the crop
    if (weatherData.main.humidity >= crop.humidity.min) {
      insightsList.push(`Humidity is ideal for ${cropType}.`);
    } else {
      insightsList.push(`Humidity is too low for ${cropType}.`);
    }

    insightsList.push(crop.condition);
    setInsights(insightsList);
  };

  // Handle location input
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // Handle crop type input
  const handleCropChange = (event) => {
    setCropType(event.target.value);
  };

  const handleSubmit = () => {
    if (location && cropType) {
      getWeatherData(location);
    } else {
      toast.error('Please enter a location and select a crop.');
    }
  };

  return (
    <div className="App">
      <h1>Crop-Specific Weather Insights</h1>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={handleLocationChange}
      />
      <select onChange={handleCropChange} value={cropType}>
        <option value="">Select Crop</option>
        <option value="rice">Rice</option>
        <option value="wheat">Wheat</option>
        <option value="corn">Corn</option>
      </select>
      <button onClick={handleSubmit}>Get Insights</button>

      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {insights.length > 0 && (
        <div>
          <h3>Crop Insights:</h3>
          <ul>
            {insights.map((insight, index) => (
              <li key={index}>{insight}</li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
