

// import jwt from 'jsonwebtoken';

// const getUserRole = (): string | null => {
//   const userSession = localStorage.getItem('userSession');

//   if (userSession) {
//     try {
//       const { access_token } = JSON.parse(userSession);
//       const decodedToken = jwt.decode(access_token) as { [key: string]: any } | null;
//       return decodedToken?.https['huellasdesperanza.com/role'] || null; 
//     } catch (error) {
//       console.error('Error al decodificar el accessToken:', error);
//     }
//   } else {
//     console.error('No se encontró userSession en el localStorage');
//   }

//   return null;
// };

// export default getUserRole;
