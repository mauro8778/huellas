import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SkeletonCard = () => (
  <div className="p-4 bg-gray-100 shadow rounded-lg">
    <Skeleton height={40} width={40} circle={true} className="mb-4 skeleton " />
    <Skeleton height={20} width={`80%`} className="mb-2 skeleton " />
    <Skeleton height={20} width={`60%`} className='skeleton' />
  </div>
);

const SkeletonStatCard = () => (
  <div className="p-4 bg-gray-100 shadow rounded-lg">
    <Skeleton height={30} width={`50%`} className="mb-2 skeleton " />
    <Skeleton height={30} width={`30%`} />
  </div>
);

const SkeletonChart = () => (
  <div className="p-6 bg-gray-100 shadow-lg rounded-lg mb-6">
    <Skeleton height={30} width={`50%`} className="mb-4 skeleton" />
    <Skeleton height={200} className='skeleton'/>
  </div>
);

const SkeletonList = () => (
  <div className="max-w-2xl mx-auto p-4 bg-gray-50 skeleton rounded-xl border shadow-xl h-[390px] overflow-y-auto custom-scrollbar">
    <Skeleton height={30} width={`50%`} className="mb-4 skeleton " />
    <ul role="list" className="divide-y divide-gray-200 ml-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="py-2 sm:py-3">
          <div className="flex items-center space-x-4">
            <Skeleton height={40} width={40} circle={true} className='skeleton'/>
            <div className="flex-1 min-w-0">
              <Skeleton height={20} width={`80%`} className="mb-2 skeleton " />
              <Skeleton height={20} width={`60%`}  className='skeleton' />
                
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const DashboardMainSkeleton: React.FC = () => {
  return (
    <div className="flex-1 p-6">
      <Skeleton height={30} width={`50%`} className="mb-4 skeleton " />
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 skeleton '>
        <SkeletonStatCard />
        <SkeletonStatCard />
        <SkeletonStatCard />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="col-span-1 md:col-span-1 lg:col-span-1 skeleton ">
          <SkeletonList />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 skeleton ">
          <SkeletonChart />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 skeleton ">
          <SkeletonList />
        </div>
        <div className='col-span-1 md:col-span-1 lg:col-span- 1skeleton '>
          <SkeletonList />
        </div>
      </div>
    </div>
  );
};

export default DashboardMainSkeleton;
