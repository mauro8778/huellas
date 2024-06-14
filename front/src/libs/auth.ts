// lib/auth.ts
export function checkUserRole(): 'admin' | 'user' | null {
    const session = localStorage.getItem('userSession');
    if (session) {
      const { id_token } = JSON.parse(session);
      if (id_token) {
        const decodedToken = JSON.parse(id_token); // Asumimos que decodeJwt ya lo hace esto
        return decodedToken.role;
      }
    }
    return null;
  }
  