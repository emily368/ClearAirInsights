import React from 'react';
import './RegisterPages.css';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPages() {
  const navigate = useNavigate();

  const handleMain = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bce3f8] p-4">
      <div className="w-full max-w-4xl bg-[#bce3f8] p-6 md:p-16 rounded-xl shadow-lg">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#0000cc] text-center mb-4">Registrarse</h1>

        {/* Descripción */}
        <p className="text-center mb-6">
          ¿Eres nuevo en <span className="font-semibold">ClearAir Insights</span>?
        </p>

        {/* Formulario */}
        <form>
          {/* Correo y Teléfono */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-black">Correo electrónico <span className="text-red-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="clearair.insights@gmail.com"
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="block text-sm font-medium text-black">Teléfono <span className="text-red-500">*</span></label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="1234567890"
              />
            </div>
          </div>

          {/* Nombre y Apellido Paterno */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="firstName" className="block text-sm font-medium text-black">Nombre(s) <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Emily"
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block text-sm font-medium text-black">Apellido Paterno <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Ochoa"
              />
            </div>
          </div>

          {/* Apellido Materno y Fecha de nacimiento */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="motherLastName" className="block text-sm font-medium text-black">Apellido Materno</label>
              <input
                type="text"
                id="motherLastName"
                name="motherLastName"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="Sosa"
              />
            </div>
            <div className="w-full">
              <label htmlFor="dob" className="block text-sm font-medium text-black">Fecha de nacimiento <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Contraseña y Confirmar Contraseña */}
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-black">Contraseña <span className="text-red-500">*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="******"
              />
            </div>
            <div className="w-full">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirmar Contraseña <span className="text-red-500">*</span></label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                placeholder="******"
              />
            </div>
          </div>

          {/* Términos */}
          <p className="text-center text-sm text-black mb-6">
            Al crear una cuenta, aceptas las <a href="#" className="text-blue-600 underline">Condiciones de Uso</a> y el <a href="#" className="text-blue-600 underline">Aviso de Privacidad</a> de ClearAir Insights.
          </p>

          {/* Botón */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleMain}
              className="w-full md:w-1/2 bg-[#4caf50] text-white font-bold py-2 px-4 rounded-lg text-lg hover:bg-[#43a047] transition"
            >
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPages;
