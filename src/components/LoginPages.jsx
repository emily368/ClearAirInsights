import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from "../assets/avatar.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './LoginPages.css';

function LoginPages() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      localStorage.setItem('email', email);
      navigate('/test');
    } else {
      alert('Por favor ingresa email y contraseña');
    }
  };

  const handleRegister = () => navigate('/register');
  const handleForgotPassword = () => navigate('/password');

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[#bce3f8] overflow-auto">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl min-h-[90vh] lg:min-h-[90vh] bg-white shadow-lg rounded-none lg:rounded-2xl overflow-auto">
        
        {/* Imagen avatar - solo en pantallas grandes */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[#bce3f8] items-center justify-center p-8">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-3/4 max-w-sm h-auto object-contain" 
          />
        </div>

        {/* Formulario de login */}
        <div className="w-full lg:w-1/2 bg-[#bce3f8] p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0000cc] mb-4 text-center">Iniciar sesión</h1>

          <p className="text-base sm:text-lg mb-4 text-center">
            ¿Aún no tienes cuenta?
            <span 
              onClick={handleRegister} 
              className="text-[#0000cc] cursor-pointer ml-1 underline"
            >
              Registrarse
            </span>
          </p>

          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700">Correo electrónico:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-lg border border-gray-300 mt-2 text-base"
              autoComplete="username"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm sm:text-base text-gray-700">Contraseña:</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-300 mt-2 pr-12 text-base"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[50%] transform -translate-y-1/2 text-gray-600"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          <span 
            onClick={handleForgotPassword} 
            className="text-sm sm:text-base text-[#0000cc] text-center cursor-pointer mb-6 underline"
          >
            ¿Has olvidado tu contraseña?
          </span>

          <button 
            onClick={handleLogin} 
            className="w-full bg-[#4caf50] text-white font-bold py-3 rounded-lg text-lg hover:bg-[#45a049] transition"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;

