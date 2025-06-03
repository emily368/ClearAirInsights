import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import avatar from "../assets/avatar.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './LoginPages.css'; 
import axios from 'axios';

function LoginPages() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    // Aquí puedes agregar la lógica real de login con axios si quieres
    if(email && password){
      localStorage.setItem('email', email);
      navigate('/test');
    } else {
      alert('Por favor ingresa email y contraseña');
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/password');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="flex w-full w-screen h-[90vh]"> 
        
        <div className="w-1/2 bg-[#bce3f8] flex items-center justify-center p-16 rounded-l-2xl"> 
          <img 
            src={avatar} 
            alt="Avatar" 
            className="w-[600px] h-[800px]" 
            style={{ transform: 'translate(76px, 38px)' }} 
          /> 
        </div>

        <div className="w-1/2 bg-[#bce3f8] p-16 rounded-r-2xl flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#0000cc] mb-6 text-center">Iniciar sesión</h1> 
          <p className="text-lg mb-4 text-center">
            ¿Aún no tienes cuenta? 
            <span 
              onClick={handleRegister} 
              className="text-lg text-[#0000cc] block text-center mb-6 cursor-pointer"
            >
              Registrarse
            </span>
          </p> 

          <div className="mb-6">
            <label className="block text-lg text-gray-700">Correo electrónico:</label>
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-5 rounded-lg border-2 border-gray-100 mt-4 text-xl" 
              autoComplete="username"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg text-gray-700">Contraseña:</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-5 rounded-lg border-2 border-gray-100 mt-4 pr-12 text-xl" 
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-8 top-[65%] transform -translate-y-1/2 text-gray-800"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? <FaEyeSlash size={24} /> : <FaEye size={24} />}
              </button>
            </div>
          </div>

          <span 
            onClick={handleForgotPassword} 
            className="text-lg text-[#0000cc] block text-center mb-6 cursor-pointer"
          >
            ¿Has olvidado tu contraseña?
          </span>

          <button 
            onClick={handleLogin} 
            className="w-full bg-[#4caf50] text-white font-bold py-2 mt-6 rounded-lg text-center text-2xl"
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;
