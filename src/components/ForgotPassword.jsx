<<<<<<< HEAD
import React, { useState } from 'react';

function ForgotPassword() {
  const [emailPhone, setEmailPhone] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!newPassword || !confirmPassword) {
      setErrorMsg('Por favor ingresa y confirma tu nueva contraseña.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailPhone, verificationCode, newPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || 'Error al restablecer la contraseña.');
      } else {
        setSuccessMsg('Contraseña actualizada correctamente.');
        // Opcional: limpiar campos
        setEmailPhone('');
        setVerificationCode('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setErrorMsg('Error de red o servidor. Intenta más tarde.');
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#bce3f8] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-xl w-full max-w-2xl shadow-lg">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#0000cc] mb-6 text-center">
          ¿Olvidaste tu contraseña?
        </h2>

        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4 w-full">
            <div className="flex-1">
              <label htmlFor="emailPhone" className="block text-sm font-medium text-black mb-1">
                Correo electrónico
              </label>
              <input
                type="text"
                id="emailPhone"
                name="emailPhone"
                value={emailPhone}
                onChange={(e) => setEmailPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="correo electrónico"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="verificationCode" className="block text-sm font-medium text-black mb-1">
                Código de verificación
              </label>
              <input
                type="text"
                id="verificationCode"
                name="verificationCode"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="010203"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-4 w-full">
            <div className="flex-1">
              <label htmlFor="newPassword" className="block text-sm font-medium text-black mb-1">
                Nueva contraseña
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="******"
                required
              />
            </div>

            <div className="flex-1">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-black mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="******"
                required
              />
            </div>
          </div>

          {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
          {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full sm:w-1/2 bg-[#4caf50] text-white font-bold py-2 px-4 rounded-lg text-lg mt-4 hover:bg-green-600 transition ${
              loading ? 'opacity-60 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Enviando...' : 'Aceptar'}
=======
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
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
          </button>
        </form>
      </div>
    </div>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
}

export default ForgotPassword;
