'use client'

import React, { useEffect, useState } from 'react';

const Donations = () => {
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

                const response = await fetch('https://huellasdesperanza.onrender.com/orders/all', {
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
        return <div>No tiene donaciones aún.</div>;
    }

    return (
        <div>
            <h1>Donaciones</h1>
            <ul>
                {donations.map((donation, index) => (
                    <li key={index}>{donation}</li>
                ))}
            </ul>
        </div>
    );
}

export default Donations;
