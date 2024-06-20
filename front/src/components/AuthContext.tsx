import jwt from 'jsonwebtoken';

const getUserRole = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    try {
      const decodedToken = jwt.decode(accessToken) as { [key: string]: any } | null;
      return decodedToken?.role; 
    } catch (error) {
      console.error('Error al decodificar el accessToken:', error);
    }
  } else {
    console.error('No se encontró accessToken en el localStorage');
  }

  return null;
};

export default getUserRole;
