import React, { useState } from 'react';
import './RegisterPages.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function RegisterPages() {
  const navigate = useNavigate();

  // Estados para inputs
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para validar y registrar
  const handleRegister = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!email || !phone || !firstName || !lastName || !dob || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Validar que contraseñas coincidan
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Aquí podrías agregar validación adicional (email válido, contraseña fuerte, etc.)

    // Guardar usuario en localStorage (simulando base de datos)
    const userData = {
      email,
      phone,
      firstName,
      lastName,
      motherLastName,
      dob,
      password,
    };

    // Guardar el usuario bajo su email como clave
    localStorage.setItem('user_' + email, JSON.stringify(userData));

    alert('Registro exitoso. Ahora puedes iniciar sesión.');

    // Navegar a login
    navigate('/login');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="flex w-screen h-[90vh]">
        <div className="w-screen bg-[#bce3f8] p-16 rounded-r-2xl flex flex-col justify-start">
          <h1 className="text-4xl font-bold text-[#0000cc] mb-4 text-center">Registrarse</h1>

          <div className="mt-2 text-s text-center mb-6">
            <p>¿Eres nuevo en <span className="font-semibold">ClearAir Insights?</span></p>
          </div>

          <form onSubmit={handleRegister}>
            {/* Correo y Teléfono */}
            <div className="mb-3 flex justify-between">
              <div className="w-1/2">
                <label htmlFor="email" className="block text-xs font-medium text-black-200">Correo electrónico <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1234567890"
                />
              </div>
            </div>

            {/* Nombre y Apellido Paterno */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="firstName" className="block text-xs font-medium text-black-200">Nombre(s) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
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
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ochoa"
                />
              </div>
            </div>

            {/* Apellido Materno y Fecha de nacimiento */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%]">
                <label htmlFor="motherLastName" className="block text-xs font-medium text-black-200">Apellido Materno</label>
                <input
                  type="text"
                  id="motherLastName"
                  name="motherLastName"
                  value={motherLastName}
                  onChange={e => setMotherLastName(e.target.value)}
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
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Contraseña y Confirmar Contraseña */}
            <div className="mb-3 flex justify-between">
              <div className="w-[48%] relative">
                <label htmlFor="password" className="block text-xs font-medium text-black-200">Contraseña <span className="text-red-500">*</span></label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="******"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-[38px] text-gray-600"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="w-[48%] relative">
                <label htmlFor="confirmPassword" className="block text-xs font-medium text-black-200">Confirmar Contraseña <span className="text-red-500">*</span></label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  placeholder="******"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-[38px] text-gray-600"
                  aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="mb-5 text-center text-black-200 mt-8">
              <p>Al crear una cuenta, aceptas las <a href="#" className="text-blue-500">Condiciones de Uso</a> y el <a href="#" className="text-blue-500">Aviso de Privacidad</a> de Clearair Insights.</p>
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-1/2 bg-[#4caf50] text-white font-bold py-2 px-4 rounded-lg text-lg"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPages;
