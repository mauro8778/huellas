
import React, { useState, useRef, useEffect } from 'react';
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
  const mapInstance = useRef<any>(null);

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

  useEffect(() => {
    if (typeof window !== 'undefined' && shelter && mapRef.current) {
      const L = require('leaflet');
      if (!mapInstance.current) {
        mapInstance.current = L.map(mapRef.current).setView([shelter.lat, shelter.lon], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapInstance.current);
        L.marker([shelter.lat, shelter.lon]).addTo(mapInstance.current)
          .bindPopup('Shelter Location').openPopup();
      } else {
        mapInstance.current.setView([shelter.lat, shelter.lon], 13);
      }
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [shelter]);

  return (
    <div>
      <div id="response" className='mt-10'>
        {error && <p>Error: {error}</p>}
        {shelter && (
          <>

            {/* <p>{shelter.display_name}</p> */}

          </>
        )}
      </div>
      <div id="map" ref={mapRef} style={{ height: '400px', width: '100%', marginTop: '20px' }}></div>
    </div>
  );
};

export default ShelterGeolocation;

