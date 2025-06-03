// src/screens/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    birthdate: '',
  });

  useEffect(() => {
    // Suponemos que userData está guardado en localStorage como JSON
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUserData({
        email: storedUser.email || '',
        phone: storedUser.phone || '',
        birthdate: storedUser.birthdate || '',
      });
    }
  }, []);

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      '¿Estás seguro que quieres borrar tu cuenta? Esta acción es irreversible.'
    );
    if (confirmed) {
      localStorage.removeItem('userData');
      // Aquí podrías agregar más limpieza si guardas más info
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#bce3f8] flex flex-col items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Mi Cuenta</h1>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Correo electrónico:</label>
          <p className="bg-gray-100 p-2 rounded">{userData.email || 'No disponible'}</p>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Número de teléfono:</label>
          <p className="bg-gray-100 p-2 rounded">{userData.phone || 'No disponible'}</p>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Fecha de nacimiento:</label>
          <p className="bg-gray-100 p-2 rounded">{userData.birthdate || 'No disponible'}</p>
        </div>

        <button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
        >
          Borrar Cuenta
        </button>
      </div>
    </div>
  );
}

export default Account;
