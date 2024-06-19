// pages/admin/BannerAdmin.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const BannerAdmin: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bannerData = { imageSrc, altText, endDate };
    localStorage.setItem("bannerData", JSON.stringify(bannerData));
    Swal.fire({
      icon: 'success',
      title: 'Banner guardado con éxito',
      showConfirmButton: false,
      timer: 1500
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Administrar Banner Promocional</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">URL de la Imagen:</label>
          <input 
            type="text" 
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Texto Alternativo:</label>
          <input 
            type="text" 
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Fecha de Fin:</label>
          <input 
            type="datetime-local" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Guardar</button>
      </form>
    </div>
  );
};

export default BannerAdmin;
