'use client';
import React from 'react';

const SimulateLogin: React.FC = () => {
  const simulateUserLogin = () => {
    const userToken = {
      id_token: JSON.stringify({
        name: "user",
        nickname: "lukas123",
        picture: "/avatar.webp",
        email: "user@example.com",
        role: "user",
      }),
    };
    localStorage.setItem('userSession', JSON.stringify(userToken));
    window.location.reload();
  };

  const simulateAdminLogin = () => {
    const adminToken = {
      id_token: JSON.stringify({
        name: "Admin",
        nickname: "Mauricio",
        picture: "/admin.webp",
        email: "admin@example.com",
        role: "admin",
      }),
    };
    localStorage.setItem('userSession', JSON.stringify(adminToken));
    window.location.reload();
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={simulateUserLogin}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Simular Usuario
      </button>
      <button
        onClick={simulateAdminLogin}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Simular Admin
      </button>
    </div>
  );
};

export default SimulateLogin;
