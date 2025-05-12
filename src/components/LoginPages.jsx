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
        </div>
      </div>
    </div>
  );
}

export default LoginPages;