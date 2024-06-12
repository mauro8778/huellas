'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { IDonation } from '@/types';

interface DonationsContextProps {
  donations: IDonation[];
  setDonations: React.Dispatch<React.SetStateAction<IDonation[]>>;
  totalDonations: number;
}

const DonationsContext = createContext<DonationsContextProps | undefined>(undefined);

export const useDonations = () => {
  const context = useContext(DonationsContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationsProvider');
  }
  return context;
};

export const DonationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<IDonation[]>([]);

  useEffect(() => {
    // Cargar donaciones desde el localStorage
    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
  }, []);

  const totalDonations = donations.reduce((total, donation) => total + donation.amount, 0);

  return (
    <DonationsContext.Provider value={{ donations, setDonations, totalDonations }}>
      {children}
    </DonationsContext.Provider>
  );
};
