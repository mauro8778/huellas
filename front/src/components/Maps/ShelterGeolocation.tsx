import React, { useState, useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Shelter {
  display_name: string;
  lat: number;
  lon: number;
}

interface ShelterGeolocationProps {
  shelterId: string;
}

const ShelterGeolocation: React.FC<ShelterGeolocationProps> = ({ shelterId }) => {
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (shelter && mapRef.current) {
      const map = L.map(mapRef.current).setView([shelter.lat, shelter.lon], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker([shelter.lat, shelter.lon]).addTo(map)
        .bindPopup('Shelter Location').openPopup();
      // Limpia el mapa cuando el componente se desmonta
      return () => {
        map.remove();
      };
    }
  }, [shelter]);

  useEffect(() => {
    const fetchShelter = async () => {
      try {
        const response = await fetch(`https://huellasdesperanza.onrender.com/shelters/${shelterId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Server response was not in JSON format');
        }

        const data = await response.json();
        setShelter(data.shelter);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setShelter(null);
      }
    };

    fetchShelter();
  }, [shelterId]);

  return (
    <div>
      <div id="response">
        {error && <p>Error: {error}</p>}
        {shelter && (
          <>
            <h2>Shelter Location:</h2>
            <p>Shelter Name: {shelter.display_name}</p>
            <p>Latitude: {shelter.lat}</p>
            <p>Longitude: {shelter.lon}</p>
          </>
        )}
      </div>
      <div id="map" ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default ShelterGeolocation;
