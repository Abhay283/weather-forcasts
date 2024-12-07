import React, { useState } from 'react';
import axios from 'axios';

const Clim = () => {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('wheat');
  const [weather, setWeather] = useState(null);
  const [irrigationAmount, setIrrigationAmount] = useState(null);
  const [soilMoisture, setSoilMoisture] = useState(50); // Simulated value (0-100)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Crop-specific water needs (simplified)
  const cropWaterNeeds = {
    wheat: { waterPerDay: 5 }, // liters per day
    tomatoes: { waterPerDay: 7 },
    rice: { waterPerDay: 8 },
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`
      );
      const weatherData = response.data;
      setWeather(weatherData);
      calculateIrrigation(weatherData);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to calculate irrigation needs
  const calculateIrrigation = (weatherData) => {
    const cropInfo = cropWaterNeeds[crop.toLowerCase()];
    if (!cropInfo) return;

    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;

    let requiredWater = cropInfo.waterPerDay;

    // Adjust based on soil moisture
    if (soilMoisture > 70) {
      requiredWater *= 0.5; // Less water if the soil is too moist
    } else if (soilMoisture < 30) {
      requiredWater *= 1.5; // More water if the soil is too dry
    }

    // Adjust based on weather conditions (rain, humidity)
    if (weatherData.rain) {
      requiredWater -= weatherData.rain["1h"] * 2.5; // 1mm rain = 2.5L water saved
    }

    setIrrigationAmount(Math.max(requiredWater, 0)); // Prevent negative water requirement
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Irrigation Scheduling System</h1>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter your location"
        />
      </div>
      
      <div>
        <label>Crop:</label>
        <select onChange={(e) => setCrop(e.target.value)} value={crop}>
          <option value="wheat">Wheat</option>
          <option value="tomatoes">Tomatoes</option>
          <option value="rice">Rice</option>
        </select>
      </div>

      <div>
        <label>Soil Moisture (%):</label>
        <input
          type="number"
          value={soilMoisture}
          onChange={(e) => setSoilMoisture(Math.min(100, Math.max(0, e.target.value)))}
          min="0"
          max="100"
        />
      </div>

      <button onClick={fetchWeatherData} disabled={loading}>
        {loading ? 'Loading...' : 'Get Irrigation Schedule'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>

          <h4>Soil Moisture: {soilMoisture}%</h4>

          <h4>Recommended Watering:</h4>
          <p>
            You need approximately {irrigationAmount.toFixed(2)} liters of water
            for the {crop}.
          </p>
        </div>
      )}
    </div>
  );
};

export default Clim;
