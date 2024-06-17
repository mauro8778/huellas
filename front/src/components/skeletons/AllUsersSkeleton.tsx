
import React from 'react';

const AllUsersSkeleton: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-4  bg-gray-300 rounded-xl border shadow-xl h-[390px] overflow-y-auto animate-pulse">
      <div className="flex justify-between items-center mb-4">
        <div className="h-6 bg-gray-400 rounded w-1/3"></div>
        <div className="h-4 bg-gray-400 rounded w-1/6"></div>
      </div>
      <ul role="list" className="divide-y divide-gray-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index} className="py-3 flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-400 rounded-full"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-400 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-400 rounded w-1/3"></div>
              <div className="h-3 bg-gray-400 rounded w-1/4 mt-1"></div>
            </div>
            <div className="h-4 bg-gray-400 rounded w-1/6"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsersSkeleton;
