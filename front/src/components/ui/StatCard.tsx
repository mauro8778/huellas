// components/ui/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  icon: React.ReactElement;
  children: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex items-center">
        <div className="mr-4">{icon}</div>
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
