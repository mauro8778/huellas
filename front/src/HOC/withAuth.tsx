// src/hoc/withAuth.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('authToken');
  return !!token; 
};

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const Wrapper: React.FC<P> = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!isAuthenticated()) {
        router.replace('/AUTH/login'); 
      } else {
        setLoading(false); 
      }
    }, []);

    if (loading) {
      return (
        <></>
      ); 

    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
