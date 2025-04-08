import React from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importa useNavigate
import avatar from "../assets/avatar.jpg";
import { FaEyeSlash } from "react-icons/fa";
import './LoginPages.css'; 

function LoginPages() {
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleLogin = () => {
    navigate('/main'); // Aquí pones la ruta a donde quieres ir
    navigate('/register'); //
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
            <Link  onClick={handleLogin} href=".src/components/RegisterPages" className="text-lg text-[#0000cc] block text-center mb-6">Registrarse</Link>
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

          <a href="#" className="text-lg text-[#0000cc] block text-center mb-6">¿Has olvidado tu contraseña?</a>

          {/* Botón con link */}
          <Link 
            onClick={handleLogin} // <- Aquí ejecutamos la función
            className="w-full bg-[#4caf50] text-white font-bold py-2 mt-6 rounded-lg text-2xl"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPages;