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
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#bce3f8] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#0000cc]">Mi Cuenta</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Correo electrónico:</label>
            <p className="bg-gray-100 p-2 rounded text-sm">{userData.email || 'No disponible'}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Número de teléfono:</label>
            <p className="bg-gray-100 p-2 rounded text-sm">{userData.phone || 'No disponible'}</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Fecha de nacimiento:</label>
            <p className="bg-gray-100 p-2 rounded text-sm">{userData.birthdate || 'No disponible'}</p>
          </div>
        </div>

        <button
          onClick={handleDeleteAccount}
          className="mt-6 w-full bg-red-600 text-white font-bold py-3 rounded-md hover:bg-red-700 transition duration-200"
        >
          Borrar Cuenta
        </button>
      </div>
    </div>
  );
}

export default Account;
