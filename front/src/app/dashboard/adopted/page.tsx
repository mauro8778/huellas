// import React from 'react'

// const Adopted = () => {
//   return (
    // <div className='  flex flex-col items-center justify-center bg-yellow-300 rounded-md md:h-[200px]  ' >
    //     <div className='text-3xl font-mono font-bold ' >
    //         Tus adopciones
    //     </div>
    // </div>
   
//   )
// }

// export default Adopted


'use client'

import React, { useEffect, useState } from 'react';

const Adopted = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const userSession = localStorage.getItem('userSession'); 
                if (!userSession) {
                    throw new Error('User session not found');
                }

                const { access_token } = JSON.parse(userSession); 

                const response = await fetch('https://huellasdesperanza.onrender.com/adoption/user', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${access_token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setDonations(data);
            } catch (error) {
                setError(error instanceof Error ? error : new Error(String(error)));
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }



    if (donations.length === 0) {
        return <div>No tiene adopciones aún.</div>;
    }

    return (

      <div className='  flex flex-col items-center justify-center bg-yellow-300 rounded-md md:h-[200px]  ' >
        <div className='text-3xl font-mono font-bold ' >
            Tus adopciones
        </div>
            <ul>
                {donations.map((donation, index) => (
                    <li key={index}>{donation}</li>
                ))}
            </ul>
        </div>
    );
}

export default Adopted;
