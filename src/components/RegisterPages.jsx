<<<<<<< HEAD
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
=======
import React from 'react'  
import './RegisterPages.css';
import { useNavigate, Link } from 'react-router-dom';  

function RegisterPages() {
  const navigate = useNavigate(); // Hook para navegar entre páginas
  
    const handleMain = () => {
      navigate('/login'); // Aquí pones la ruta a donde quieres ir
    };
  return (
    <div className="h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="flex w-screen h-[90vh]">
        
        {/* Título del formulario */}
        <div className="w-screen bg-[#bce3f8] p-16 rounded-r-2xl flex flex-col justify-start">
          <h1 className="text-4xl font-bold text-[#0000cc] mb-4 text-center">Registrarse</h1> 
          
          {/* Descripción del formulario */}
          <div className="mt-2 text-s text-center mb-6">
            <p>¿Eres nuevo en <span className="font-semibold">ClearAir Insights?</span></p>
          </div>

          {/* Formulario de registro */}
          <form>
            {/* Correo y Teléfono en la misma línea */}
            <div className="mb-3 flex justify-between">
              <div className="w-1/2">
                <label htmlFor="email" className="block text-xs font-medium text-black-200">Correo electrónico <span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="clearair.insights@gmail.com" 
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="phone" className="block text-xs font-medium text-black-200">Teléfono <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="1234567890" 
                />
              </div>
            </div>

            {/* Nombre y Apellido Paterno en la misma línea */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="firstName" className="block text-xs font-medium text-black-200">Nombre(s) <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Emily" 
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="lastName" className="block text-xs font-medium text-black-200">Apellido Paterno <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Ochoa" 
                />
              </div>
            </div>

            {/* Apellido Materno y Fecha de Nacimiento en la misma línea */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="motherLastName" className="block text-xs font-medium text-black-200">Apellido Materno</label>
                <input 
                  type="text" 
                  id="motherLastName" 
                  name="motherLastName" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Sosa" 
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="dob" className="block text-xs font-medium text-black-200">Fecha de nacimiento <span className="text-red-500">*</span></label>
                <input 
                  type="date" 
                  id="dob" 
                  name="dob" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>

            {/* Contraseña y Confirmar Contraseña en la misma línea */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="password" className="block text-xs font-medium text-black-200">Contraseña <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="******" 
                />
              </div>
              <div className="w-[48%]">
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-black-200">Confirmar Contraseña <span className="text-red-500">*</span></label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="******" 
                />
              </div>
            </div>

            {/* Descripción de los términos de uso */}
            <div className="mb-5 text-center text-black-200 mt-8">
              <p>Al crear una cuenta, aceptas las <a href="#" className="text-blue-500">Condiciones de Uso</a> y el <a href="#" className="text-blue-500">Aviso de Privacidad</a> de Clearair Insights.</p>
            </div>

            {/* Botón de "Crear cuenta" */}
            <div className="flex justify-center mt-4">
              <Link onClick={handleMain} // <- Aquí ejecutamos la función
                  href=".src/components/LoginPages" className="w-1/2 bg-[#4caf50] text-white font-bold py-1 px-4 rounded-lg text-lg">Crear cuenta</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
}

export default RegisterPages;
