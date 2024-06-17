// src/components/skeletons/SkeletonSideNav.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';

export const SkeletonSideNav: React.FC = () => {
  return (
    <div className="flex h-full flex-col px-3 w-64 py-4 md:px-2 m-0 p-0">
      <div className="mb-2 flex h-20 items-end justify-start rounded-md bg-gray-400 p-4 md:h-40">
        <Skeleton width={100} height={50} className="skeleton" />
      </div>
      <div className="text-center mb-4">
        <div className="flex items-center justify-center mb-2 bg-gray-200 h-28 rounded-md">
          <Skeleton circle={true} height={96} width={96} className="skeleton" />
        </div>
        <div className="flex flex-col h-[100px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3">
          <Skeleton width={90} className="skeleton" />
          <Skeleton width={100} className="skeleton" />
          <Skeleton width={80} className="skeleton" />
        </div>
      </div>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <div className="flex flex-col gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-200 p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <Skeleton width={30} height={30} className="skeleton" />
              <Skeleton width={100} className="skeleton" />
            </div>
          ))}
        </div>
        <div className="hidden h-auto w-full grow rounded-md bg-gray-200 md:block skeleton"></div>
        <div className="w-full">
          <Skeleton width={150} height={48} className="skeleton" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonSideNav;
