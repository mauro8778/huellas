// src/libs/decodeJwt.ts
export function decodeJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
}

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

