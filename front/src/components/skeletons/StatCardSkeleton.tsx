
import React from 'react';

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="mx-auto max-w-xs border-t-blue-500 bg-gray-300 rounded-xl p-4 animate-pulse">
      <div className="h-4 bg-gray-400 rounded mb-2"></div>
      <div className="h-6 bg-gray-400 rounded w-1/2"></div>
    </div>
  );
};

export default StatCardSkeleton;
