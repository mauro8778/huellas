
import React from 'react';

const DonationChartSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-300 shadow-lg rounded-lg p-6 mb-6 animate-pulse">
      <div className="h-6 bg-gray-400 rounded w-1/3 mb-4"></div>
      <div className="h-48 bg-gray-400 rounded"></div>
    </div>
  );
};

export default DonationChartSkeleton;
