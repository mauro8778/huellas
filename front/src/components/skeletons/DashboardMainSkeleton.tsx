import React from 'react';
import Skeleton from 'react-loading-skeleton';

const DashboardMainSkeleton: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-bold mb-4">
        <Skeleton width={200} height={24} />
      </h1>
      {isAdmin ? (
        <div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <Skeleton width={200} height={100} />
            <Skeleton width={200} height={100} />
            <Skeleton width={200} height={100} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <Skeleton width={'100%'} height={300} />
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <Skeleton width={'100%'} height={300} />
            </div>
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <Skeleton width={'100%'} height={300} />
            </div>
            <div className='col-span-1 md:col-span-1 lg:col-span-1'>
              <Skeleton width={'100%'} height={300} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-0 text-gray-600  ">
            <Skeleton width={200} height={150}  />
            <Skeleton width={200} height={150} />
            <Skeleton width={200} height={150} />
          </div>

          <Skeleton width={'100%'} height={300} />

          <div className="bg-gray-300 shadow-xl rounded-lg p-12 mb-6 skeleton">
            <Skeleton width={'100%'} height={150} />
          </div>

          <div className="bg-gray-300 shadow-xl rounded-lg p-12 mb-6 skeleton">
            <Skeleton width={'100%'} height={150} />
          </div>

          <div className="bg-gray-300 shadow-xl rounded-lg p-24 mb-6 skeleton ">
            <Skeleton width={'100%'} height={150} />
          </div>

          <div className="bg-gray-300 shadow-xl rounded-lg p-24 mb-6 skeleton">
            <Skeleton width={'100%'} height={150} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardMainSkeleton;
