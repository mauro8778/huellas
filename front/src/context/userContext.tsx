// import decodeJwt from '@/utils/decodeJwt';
// import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

// interface AuthContextType {
//     role: string | null;
//   }
// interface AuthProviderProps {
//     children: ReactNode;
//   }
  
//   const AuthContext = createContext<AuthContextType>({ role: null });
  
  

//   export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [role, setRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       const decodedToken = decodeJwt(token);
//       const roles = decodedToken ? decodedToken["https://huellasdesperanza.com/roles"] : null;
//       setRole(roles ? roles[0] : null);
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ role }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);





