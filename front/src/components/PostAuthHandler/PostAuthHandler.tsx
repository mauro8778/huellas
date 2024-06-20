import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PostAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const idToken = urlParams.get('id_token');

    if (accessToken && idToken) {
      localStorage.setItem("userSession", JSON.stringify({ access_token: accessToken, id_token: idToken }));
      console.log('Datos de la sesión del usuario almacenados en localStorage:', { access_token: accessToken, id_token: idToken });

      navigate('/dashboard');
    } else {
      console.error('Tokens not found in the URL');
    }
  }, [navigate]);

  return (
    <div>
      Redireccionando...
    </div>
  );
};

export default PostAuthHandler;
