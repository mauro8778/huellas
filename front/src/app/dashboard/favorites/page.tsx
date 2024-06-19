'use client'
import React, { useEffect, useState } from 'react';
import { IMascotas } from '@/interface/IMascotas';
import { IRefugios } from '@/interface/IRefugios';
import CardAnimals from '@/components/Card-Animals/CardAnimals';
import CardRefuge from '@/components/Refugios/CardRefuge';


const Favorite = () => {
  const [favoritePets, setFavoritePets] = useState<IMascotas[]>([]);
  const [favoriteShelters, setFavoriteShelters] = useState<IRefugios[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const userSessionString = localStorage.getItem('userSession');
        if (!userSessionString) {
          throw new Error('No user session found in local storage');
        }

        const userSession = JSON.parse(userSessionString);
        const accessToken = userSession.access_token;

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch('https://huellasdesperanza.onrender.com/users/favorite_users', {
          headers: headers,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data from API:', data);


        if (data.user.favorite_pets) {
          setFavoritePets(data.user.favorite_pets);
        }
        if (data.user.favorite_shelters) {
          setFavoriteShelters(data.user.favorite_shelters);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Cargando favoritos...</p>;
  }

  if (favoritePets.length === 0 && favoriteShelters.length === 0) {
    return <p>No tenes favoritos.</p>;
  }

  return (
    <div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {favoritePets.map((pet) => (
          <div key={pet.id} className="transform scale-75">
            <CardAnimals
              mascota={pet}
              updateMascota={() => {}} 
              deleteMascota={() => {}} 
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {favoriteShelters.map((shelter) => (
          <div key={shelter.id} className="transform scale-75">
            <CardRefuge
              refugio={shelter}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
