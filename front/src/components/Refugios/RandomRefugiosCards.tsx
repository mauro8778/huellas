'use client'
import React, { useState, useEffect } from "react";
import CardRefuge from './CardRefuge';

const RandomRefugiosCards: React.FC = () => {
  const [randomRefugios, setRandomRefugios] = useState([]);

  useEffect(() => {
    fetch("https://huellasdesperanza.onrender.com/shelters")
      .then(response => response.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRandomRefugios(selected);
      })
      .catch(error => console.error("Error fetching refugios:", error));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-2 mt-5">
      {randomRefugios.map((refugio, index) => (
        <CardRefuge key={index} refugio={refugio} />
      ))}
    </div>
  );
};

export default RandomRefugiosCards;
