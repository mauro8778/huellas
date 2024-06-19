'use client'
import React, { useEffect, useState } from 'react';
import { IMascotas } from '@/interface/IMascotas';

const Favorite = () => {
  const [favoritePets, setFavoritePets] = useState<IMascotas[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
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
        console.log('info de la api:', data); 

        setFavoritePets(data.user.favorite_pets);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Mascotas Favoritas</h2>
      <ul className='mt-5'>
        {favoritePets.map((pet) => (
          <li key={pet.id} className='mt-5'>
            <div>
              {pet.name}
            </div>
            <div>
              {pet.species}
            </div>
            <div>
              {pet.breed}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;
