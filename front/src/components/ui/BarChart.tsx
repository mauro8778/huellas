"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@tremor/react';

const dataFormatter = (number: number | bigint) => Intl.NumberFormat('us').format(number).toString();

interface DonationData {
  shelterId: string;
  shelterName: string;
  donationAmount: number;
}

interface ProcessedData {
  name: string;
  Donaciones: number;
}

export function BarChartShelter() {
  const [chartData, setChartData] = useState<ProcessedData[]>([]);

  const fetchDonations = async () => {
    try {
      const response = await axios.get<DonationData[]>('https://huellasdesperanza.onrender.com/carroti/orders');
      const donations = response.data;

      const processedData: { [key: string]: number } = {};

      donations.forEach((donation) => {
        if (processedData[donation.shelterName]) {
          processedData[donation.shelterName] += donation.donationAmount;
        } else {
          processedData[donation.shelterName] = donation.donationAmount;
        }
      });

      const formattedData = Object.entries(processedData).map(([name, Donaciones]) => ({
        name,
        Donaciones,
      }));

      setChartData(formattedData);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className='bg-white shadow-2xl rounded-xl border-t-4 border-lime500 p-6 max-w-xl'>
      <h3 className="text-xl font-semibold text-gray-500  dark:text-dark-tremor-content-strong">
        Donaciones a Refugios
      </h3>
      <BarChart
        className="mt-6 h-72"
        data={chartData}
        index="name"
        categories={['Donaciones']}
        colors={['teal']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </div>
  );
}
