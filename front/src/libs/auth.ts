// import { decodeJwt } from '@/utils/decodeJwt';

// export function checkUserRole(): 'admin' | 'user' {
//     const session = localStorage.getItem('userSession');
//     if (session) {
//         try {
//             const { id_token } = JSON.parse(session);
//             if (id_token) {
//                 const decodedToken = decodeJwt(id_token);
//                 if (decodedToken) {
//                     const roles = decodedToken['https://huellasdesperanza.com/roles'];
//                     if (roles && roles.includes('Admin')) {
//                         return 'admin';
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error('Error decoding or processing token:', error);
//         }
//     }

//     return 'user'; // Return 'user' by default or in case of errors
// }


import { decodeJwt } from '@/utils/decodeJwt';

export function checkUserRole(): 'admin' | 'user' | 'shelter' {
    const session = localStorage.getItem('userSession');
    if (session) {
        try {
            const { id_token } = JSON.parse(session);
            if (id_token) {
                const decodedToken = decodeJwt(id_token);
                if (decodedToken) {
                    const roles = decodedToken['https://huellasdesperanza.com/roles'];
                    if (roles) {
                        if (roles.includes('Admin')) {
                            return 'admin';
                        } else if (roles.includes('Shelter')) {
                            return 'shelter';
                        }
                    }
                }
            }
        } catch (error) {
            console.error('Error decoding or processing token:', error);
        }
    }

    return 'user'; // Return 'user' by default or in case of errors
}
