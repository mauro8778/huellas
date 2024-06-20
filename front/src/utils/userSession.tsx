import { useState, useEffect } from 'react';
import { decodeJwt } from './decodeJwt';

interface DecodedToken {
  [key: string]: any;
}

const useUserRole = (): string => {
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const userSessionStr = localStorage.getItem('userSession');

    if (userSessionStr) {
      const userSession = JSON.parse(userSessionStr);

      if (userSession && userSession.access_token) {
        const token = userSession.access_token;

        try {
          const decodedToken: DecodedToken = decodeJwt(token);

          const roles = decodedToken['https://huellasdesperanza.com/roles'];
          if (roles && roles.length > 0) {
            setUserRole(roles[0]); 
          }
        } catch (error) {
          console.error('Error al decodificar el token', error);
        }
      }
    }
  }, []);

  return userRole;
};

export default useUserRole;
