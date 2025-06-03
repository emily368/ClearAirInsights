<<<<<<< HEAD
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
    <div className="min-h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl h-full lg:h-[90vh] bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Imagen avatar - solo en pantallas grandes */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-[#bce3f8] items-center justify-center p-8">
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-[400px] h-auto object-contain" 
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
=======
import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate
import avatar from "../assets/avatar.jpg";
import { FaEyeSlash } from "react-icons/fa";
import './LoginPages.css'; 
import axios from 'axios'

function LoginPages() {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleLogin = () => {
    navigate('/main'); // Aquí pones la ruta a donde quieres ir
  };
  const handleRegister = () => {
    navigate('/register'); // preguntar al mayorga si aqui va solo el nombre o la ruta completa :((())):
  };
  const handleForgotPassword = () => {
    navigate('/password'); // Aquí pones la ruta a donde quieres ir
  };
  const handleTest = () => {
    navigate('/test'); // Aquí pones la ruta a donde quieres ir
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="flex w-full w-screen h-[90vh]"> 
        
        <div className="w-1/2 bg-[#bce3f8] flex items-center justify-center p-16 rounded-l-2xl"> 
          <img src={avatar} alt="Avatar" className="w-[600px] h-[600px] rounded-full" /> 
        </div>

        <div className="w-1/2 bg-[#bce3f8] p-16 rounded-r-2xl flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#0000cc] mb-6 text-center">Iniciar sesión</h1> 
          <p className="text-lg mb-4 text-center">
            ¿Aún no tienes cuenta? 
            <Link  onClick={handleRegister} href=".src/components/RegisterPages" className="text-lg text-[#0000cc] block text-center mb-6">Registrarse</Link>
          </p> 

          <div className="mb-6">
            <label className="block text-lg text-gray-700">Correo electrónico:</label>
            <input 
              type="email"
              defaultValue="cleanair.insights@gmail.com"
              className="w-full p-5 rounded-lg border-2 border-gray-100 mt-4 text-xl" 
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg text-gray-700">Contraseña:</label>
            <div className="relative">
             <input type="password" className="w-full p-5 rounded-lg border-2 border-gray-100 mt-4 pr-12 text-xl" />
             </div>
            </div>

          <Link onClick={handleForgotPassword} href=".src/components/ForgotPassword" className="text-lg text-[#0000cc] block text-center mb-6">¿Has olvidado tu contraseña?</Link>

          {/* Botón con link */}
          <Link 
            onClick={handleTest} // <- Aquí ejecutamos la función
            href=".src/components/AllergyForm" className="w-full bg-[#4caf50] text-white font-bold py-2 mt-6 rounded-lg text-center text-2xl"
          >
            Ingresar
          </Link>
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
        </div>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default LoginPages;
=======
export default LoginPages;
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
