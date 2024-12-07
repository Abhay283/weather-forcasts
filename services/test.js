// src/utils/pestDiseasePrediction.js
export const Risk = (weatherData) => {
    const { main, weather, wind } = weatherData;
  
    let alerts = [];
  
    if (main.temp > 30 && main.humidity > 70) {
      alerts.push('High risk of fungal diseases due to high temperature and humidity.');
    }
    
    if (weather.some(condition => condition.main === 'Rain') && wind.speed > 10) {
      alerts.push('Increased risk of pests due to rain and strong winds.');
    }
  
    return alerts;
  };
  