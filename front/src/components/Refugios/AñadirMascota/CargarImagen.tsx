import { useState } from 'react';

const CargaImagen = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [message, setMessage] = useState<string | null>(null); 

  const handleFileChange = (event : any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event : any) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Seleccione la imagen");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('https://huellasdesperanza.onrender.com/files/uploadFile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      const result = await response.text();  
      setMessage("File uploaded successfully!");
      console.log(result); 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Subiendo...' : 'Enviar'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default CargaImagen;