// client/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [irrigationMessage, setIrrigationMessage] = useState('');
  const [weather, setWeather] = useState(null);

  // Handle location change
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Handle crop selection
  const handleCropChange = (e) => {
    setCrop(e.target.value);
  };

  // Fetch irrigation schedule
  const getIrrigationSchedule = async () => {
    if (!location || !crop) {
      toast.error('Please provide both location and crop type!');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/irrigation/${location}/${crop}`);
      setWeather(response.data.currentWeather);
      setIrrigationMessage(response.data.irrigationMessage);
    } catch (error) {
      toast.error('Error fetching irrigation schedule');
    }
  };

  return (
    <div className="App">
      <h1>Irrigation Scheduling System</h1>

      <input
        type="text"
        placeholder="Enter location (e.g., London)"
        value={location}
        onChange={handleLocationChange}
      />

      <select onChange={handleCropChange} value={crop}>
        <option value="">Select Crop</option>
        <option value="rice">Rice</option>
        <option value="wheat">Wheat</option>
        <option value="corn">Corn</option>
      </select>

      <button onClick={getIrrigationSchedule}>Get Irrigation Schedule</button>

      {weather && (
        <div>
          <h2>Current Weather</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}

      {irrigationMessage && (
        <div>
          <h3>Irrigation Advice</h3>
          <p>{irrigationMessage}</p>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default App;
