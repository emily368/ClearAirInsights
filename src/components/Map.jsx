import React, { useState } from 'react';
import { FaMapMarkerAlt, FaUser, FaEdit } from 'react-icons/fa';
import avatar from '../assets/avatar.jpg'; // Asegúrate de tener un avatar en tu carpeta de assets
import './Map.css';
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { useNavigate, Link } from 'react-router-dom'; 

function Map() {
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false); // Para manejar el panel del usuario
    const [location, setLocation] = useState(''); // Estado para la ubicación seleccionada
    const navigate = useNavigate(); // Hook para navegar entre páginas

    const handleDetails = () => {
        navigate('/details'); // Aquí pones la ruta a donde quieres ir
      };
    // Función para alternar la visibilidad de los detalles
    const toggleDetails = () => {
        setIsDetailsVisible(!isDetailsVisible);
    };

    // Función para abrir/cerrar el panel del usuario
    const togglePanel = () => {
        setIsPanelOpen(!isPanelOpen);
    };

    // Obtener ubicación en tiempo real (ejemplo de geolocalización)
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`); // Establecer ubicación
                },
                () => alert("No se pudo obtener la ubicación.")
            );
        } else {
            alert("La geolocalización no está soportada por este navegador.");
        }
    };

    return (
        <div className="bg-[#bce3f8] h-screen w-screen flex flex-col items-center">
            {/* Panel de Usuario en la parte superior */}
            <div className="w-full bg-[#4a8a45] p-4 flex justify-between items-center rounded-b-xl shadow-lg">
                <div className="flex items-center">
                    {/* Avatar */}
                    <img
                        src={avatar}
                        alt="avatar"
                        className="w-10 h-10 rounded-full mr-4"
                    />
                    <span className="text-white font-semibold"><IoArrowBackCircleSharp /></span>
                </div>
                {/* Icono de opciones para abrir el panel */}
                <FaUser
                    className="text-white text-2xl cursor-pointer"
                    onClick={togglePanel}
                />
            </div>

            {/* Panel de opciones del usuario */}
            {isPanelOpen && (
                <div className="absolute top-16 right-6 w-48 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center mb-2">
                        <FaUser className="mr-2" />
                        <span>User123</span>
                        <FaEdit className="mr-2" />
                    </div>
                    <div className="flex items-center mb-2">
                        <span>Cuenta</span>
                    </div>
                    <div className="mb-2">
                        <span>Configuración y privacidad</span>
                    </div>
                    <div className="mb-2">
                        <span>Idioma</span>
                    </div>
                    <div className="mb-2">
                        <span>Acerca de</span>
                    </div>
                    <div className="mb-2">
                        <span>Ayuda</span>
                    </div>
                    <div className="mt-4">
                        <button className="bg-red-500 text-white py-2 px-4 rounded-md w-full hover:bg-red-600">
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            )}

            {/* Sección principal con el Mapa y el panel de ubicación */}
            <div className="flex w-full max-w-screen-lg mt-6">
                {/* Mapa a la izquierda con margen */}
                <div className="w-2/3 p-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705202.7927655154!2d-101.28610236129579!3d24.919731511435387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x867953aedb1e2459%3A0x33859f5a35e81925!2sTamaulipas!5e0!3m2!1ses!2smx!4v1743442835585!5m2!1ses!2smx"
                        width="100%"
                        height="550"
                        loading="lazy"
                        className="rounded-xl shadow-lg"
                    ></iframe>
                </div>

                {/* Panel cuadrado de ubicación a la derecha */}
                <div className="w-80 h-80 p-2 bg-[#e8e4e4] rounded-xl shadow-lg ml-auto mt-24">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-4">Ubicación:</h1>

                    {/* Barra de controles */}
                    <div className="flex items-center justify-between mb-4">
                        {/* Botón de ubicación */}
                        <button
                            onClick={getLocation}
                            className="text-2xl text-gray-600 hover:text-blue-500 focus:outline-none"
                        >
                            <FaMapMarkerAlt />
                        </button>
                    </div>

                    {/* Mostrar la ubicación seleccionada */}
                    {location ? (
                        <div className="text-gray-800 font-semibold mt-2">
                            {location}
                        </div>
                    ) : (
                        <div className="text-gray-400">Ubicación no seleccionada</div>
                    )}

                    {/* Botón para ver los detalles */}
                    <Link
                        onClick={handleDetails} href=".src/components/Details"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 mt-4"
                    >
                        Ver detalles
                    </Link>

                    {/* Detalles opcionales */}
                    {isDetailsVisible && (
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <p>Detalles de la ubicación o información adicional...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Map;
