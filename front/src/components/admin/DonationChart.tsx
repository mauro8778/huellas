/* eslint-disable react-hooks/exhaustive-deps */
// DonationChart.tsx
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DonationChart: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Donaciones',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    
    axios.get('https://huellasdesperanza.onrender.com/carrito/orders') //<---- Aca tengo q hace la peticion get para todas las donaciones 
      .then(response => {
        const data = response.data;
        const labels = data.map((donation: { refugio: any; }) => donation.refugio);
        const donationData = data.map((donation: { amount: any; }) => donation.amount);
        setChartData({
          labels: labels,
          datasets: [
            {
              ...chartData.datasets[0],
              data: donationData,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Error fetching donation data:', error);
      });
  }, []);

  return (
    <div className="bg-white shadow-xl rounded-xl border-t-4 border-lima500 p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">Gráfico de Donaciones</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default DonationChart;

