import React from 'react'
import './ForgotPassword.css';

function ForgotPassword() {
  return (
    <div className='bg-[#bce3f8] h-screen flex items-center justify-center'>
      <div className='bg-[#bce3f8] p-8 rounded-xl w-screen shadow-lg relative z-10'>
        {/* Título del formulario */}
        <h2 className="text-4xl font-bold text-[#0000cc] mb-6 text-center">¿Olvidaste tu contraseña?</h2>

        {/* Formulario de recuperación de contraseña */}
        <form className="flex flex-col items-center">
          {/* Teléfono o correo electrónico y código de verificación en una sola línea */}
          <div className="flex space-x-4 mb-4 w-full">
            <div className="flex-1">
              <label htmlFor="emailPhone" className="block text-sm font-medium text-black-200">Correo electrónico</label>
              <input type="text" id="emailPhone" name="emailPhone" className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="1234567890 o correo electrónico" />
            </div>

            <div className="flex-1">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-black-200">Teléfono</label>
              <input type="text" id="verificationCode" name="verificationCode" className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="010203" />
            </div>
          </div>

          {/* Nueva contraseña y confirmar contraseña en una sola línea */}
          <div className="flex space-x-4 mb-4 w-full">
            <div className="flex-1">
              <label htmlFor="newPassword" className="block text-sm font-medium text-black-200">Ingresa tu nueva contraseña</label>
              <input type="password" id="newPassword" name="newPassword" className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="******" />
            </div>

            <div className="flex-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black-200">Confirmar contraseña</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="******" />
            </div>
          </div>

          {/* Botón de aceptar más pequeño y centrado */}
          <button className="w-1/2 bg-[#4caf50] text-white font-bold py-1 px-4 rounded-lg text-lg mt-4">
            Aceptar
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;
