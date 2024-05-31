import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// API KEY untuk OpenWeather
const OPENWEATHERMAP_API_KEY = 'd17624d72ff9a029bf23d6e72a6b3267';

const locations = [
  { name: 'Telaga Biru Cisoka', lat: -6.2565, lng: 106.5375 },
  { name: 'Pantai Sawarna', lat: -6.3907, lng: 106.0958 },
  { name: 'Pantai Anyer', lat: -6.0363, lng: 105.7343 },
  { name: 'Taman Nasional Ujung Kulon', lat: -6.7491, lng: 105.4027 },
  { name: 'Pantai Carita', lat: -6.2654, lng: 105.9474 }
]

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const WeatherMap = ({ name }) => {
  const [weatherData, setWeatherData] = useState({});
  const [locationIndex, setLocationIndex] = useState(null);

  useEffect(() => {
    if (name) {
      const index = locations.findIndex((location) => location.name === name);
      console.log(index)
      setLocationIndex(index);
    }
  }, [name]);

  useEffect(() => {
    const fetchWeather = async () => {
      if (locationIndex !== null) {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locations[locationIndex].lat}&lon=${locations[locationIndex].lng}&appid=${OPENWEATHERMAP_API_KEY}`
        );
        setWeatherData({ [name]: response.data });
      }
    };

    fetchWeather();
  }, [locationIndex, name]);

  if (locationIndex === null || !weatherData[name]) {
    return <div>Loading...</div>;
  }

  const location = locations[locationIndex];
  const weather = weatherData[name];

  return (
    <MapContainer center={[location.lat, location.lng]} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[location.lat, location.lng]}  icon={customIcon}>
        <Popup>
          <div>
            <h2 class="text-xl font-bold mb-4">{location.name}</h2>
            <p class="text-base">{weather.weather[0].description}</p>
            <p class="text-base">Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeatherMap;
