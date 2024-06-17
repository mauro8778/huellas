'use client';

import DonationChart from '@/components/admin/DonationChart';
import React from 'react';

const DonationsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Donaciones</h1>
      <DonationChart />
    </div>
  );
};

export default DonationsPage;

