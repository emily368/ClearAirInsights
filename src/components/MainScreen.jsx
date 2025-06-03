<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react';
import { FaUser, FaTrash, FaStar, FaRegStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Tecky from "../assets/Tecky.jpeg";
import avatar from "../assets/avatar.png";
import { haversineDistance } from '../utils';

function MainScreen() {
  const [location, setLocation] = useState(null);
  const [recentPlaces, setRecentPlaces] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showingFavorites, setShowingFavorites] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/');
      return;
    }
    setUserName(userData.name || 'Usuario');

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => console.error("Error obteniendo la ubicación:", error)
      );
    }

    const storedPlaces = JSON.parse(localStorage.getItem("recentPlaces")) || [];
    const sortedPlaces = storedPlaces.sort((a, b) => b.timestamp - a.timestamp);
    const storedFavorites = JSON.parse(localStorage.getItem("favoritePlaces")) || [];
    setRecentPlaces(sortedPlaces);
    setFavorites(storedFavorites);

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [navigate]);

  const handleClearHistory = () => {
    localStorage.removeItem("recentPlaces");
    setRecentPlaces([]);
  };

  const toggleFavorite = (place) => {
    const isFav = favorites.some(
      (p) => p.latitude === place.latitude && p.longitude === place.longitude
    );
    const updatedFavorites = isFav
      ? favorites.filter((p) => !(p.latitude === place.latitude && p.longitude === place.longitude))
      : [...favorites, place];
    setFavorites(updatedFavorites);
    localStorage.setItem("favoritePlaces", JSON.stringify(updatedFavorites));
  };

  const placesToShow = showingFavorites ? favorites : recentPlaces;

  return (
    <div className="bg-[#bce3f8] min-h-screen flex flex-col items-center justify-start">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#4a8a45] p-4 flex justify-between items-center z-20">
        <img src={avatar} alt="avatar" className="w-10 h-10" />
        <div className="relative" ref={menuRef}>
          <FaUser
            className="text-white text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-30 text-black">
              <div className="px-4 py-2 border-b border-gray-300 font-semibold">
                {userName}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  localStorage.removeItem('userData');
                  navigate('/');
                }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Contenido principal */}
      <div className="pt-32 px-4 w-full max-w-screen-xl">
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 flex-wrap">
          {/* Columna izquierda */}
          <div className="w-full md:w-1/2 mt-4 md:mt-10">
            <h1 className="text-3xl font-bold text-center md:text-left mb-4">
              ¡Bienvenido a ClearAir Insights!
            </h1>

            <div className="bg-[#f0f4f7] p-6 rounded-md shadow-md mb-6 text-center">
              <p className="text-lg text-gray-700 mb-2">
                Conoce la calidad del aire a tu alrededor y protege tu salud con información actualizada al instante.
              </p>
              <p className="text-xl font-semibold text-gray-800">
                ¡Respira mejor, vive mejor!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Link to="/map" className="w-full sm:w-auto">
                <button className="w-full bg-blue-600 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 transition">
                  Ver Mapa
                </button>
              </Link>
              <Link to="/file" className="w-full sm:w-auto">
                <button className="w-full bg-blue-600 text-white py-2 px-4 text-sm rounded-md hover:bg-blue-700 transition">
                  Ver datos guardados
                </button>
              </Link>
            </div>

            <div className="bg-[#e8e4e4] p-4 rounded-md shadow-md mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                <h3 className="text-lg font-semibold">
                  {showingFavorites ? "Favoritos" : "Lugares Recientes"}
                </h3>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => setShowingFavorites(!showingFavorites)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {showingFavorites ? "Ver Recientes" : "Ver Favoritos"}
                  </button>
                  {!showingFavorites && (
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      title="Limpiar historial"
                      onClick={handleClearHistory}
                    />
                  )}
                </div>
              </div>

              {placesToShow.length === 0 ? (
                <p className="text-sm text-gray-500">No hay lugares para mostrar.</p>
              ) : (
                <div className="space-y-3">
                  {placesToShow.map((place, index) => {
                    const distance = location
                      ? haversineDistance(
                          location.latitude,
                          location.longitude,
                          place.latitude,
                          place.longitude
                        ).toFixed(2)
                      : '...';
                    const isFav = favorites.some(
                      (p) => p.latitude === place.latitude && p.longitude === place.longitude
                    );

                    return (
                      <div key={index} className="border-b border-gray-300 pb-2 last:border-b-0">
                        <p className="font-semibold">{place.name}</p>
                        <p className="text-sm font-semibold">{distance} km</p>
                        <button
                          onClick={() => toggleFavorite(place)}
                          title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
                          className="text-yellow-500"
                        >
                          {isFav ? <FaStar /> : <FaRegStar />}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Columna derecha - Imagen */}
          <div className="w-full md:w-1/2 mt-6 md:mt-10 flex justify-center">
            <img
              src={Tecky}
              alt="Tecky"
              className="rounded-lg shadow-lg max-w-full md:max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
=======
import React, { useState } from 'react'; 
import './MainScreen.css';
import { FaSearch, FaUser, FaEdit } from 'react-icons/fa'; 
import tam from "../assets/tam.jpg";
import avatar from "../assets/avatar.jpg";
import { useNavigate, Link } from 'react-router-dom'; //añadi esta funcion

function MainScreen() {
  // Estado para manejar la ciudad ingresada en el buscador
  const [search, setSearch] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Estado para abrir/cerrar el panel

  // Función para manejar el cambio en el input de búsqueda
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Función para abrir/cerrar el panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };
  
  const navigate = useNavigate();
  const handleMap = () => {
    navigate('/map'); // Aquí pones la ruta a donde quieres ir
  };

  return (
    <div className="bg-[#bce3f8] h-screen flex flex-col items-center justify-start">
      {/* Panel superior */}
      <div className="absolute top-0 left-0 w-full bg-[#4a8a45] p-4 flex justify-between items-center z-20">
        {/* Avatar en la parte izquierda */}
        <div className="flex items-center">
         <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
         <span className="text-white font-semibold text-lg ml-4"></span>
        </div>
        
        {/* Icono de "User" en la parte derecha, al hacer clic se abre el panel */}
        <FaUser className="text-white text-2xl cursor-pointer" onClick={togglePanel} />
      </div>

      {/* Panel de usuario que aparece al hacer clic en el ícono */}
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

      {/* Contenedor principal */}
      <div className="bg-[#bce3f8] p-8 rounded-xl w-screen md:w-screen shadow-lg mt-6">
        {/* Contenedor Flex para "tam" en la mitad izquierda y el texto en la mitad derecha */}
        <div className="flex items-center justify-end mb-4">
          {/* Imagen de "tam" en la mitad del lado izquierdo */}
          <div className="w-1/2 flex justify-center items-center mt-8">
            <img src={tam} alt="tam" className="w-[550px] h-[550px] rounded-full" />
          </div>

          {/* Texto en la mitad del lado derecho, alineado a la derecha */}
          <div className="w-1/2 text-center pr-1 mt-20"> {/* Aumenta mt según sea necesario */}
  <h1 className="text-3xl font-bold text-blue-500 mb-2">¡Bienvenido a ClearAir Insights!</h1>
  {/* Cuadro con el mensaje de bienvenida, difuminado */}
  <div className="bg-[#f0f4f7] p-6 rounded-lg shadow-md mb-4 mx-auto w-full text-center">
    <p className="text-lg text-gray-700 mb-2">
      Conoce la calidad del aire a tu alrededor y protege tu salud con información actualizada al instante.
    </p>
    <p className="text-xl font-semibold text-gray-800">
      ¡Respira mejor, vive mejor!
    </p>
  </div>





        {/* Campo de búsqueda y botón "Continuar" alineados a la derecha y más pequeños */}
        <div className="flex mb-4 w-full justify-end items-center gap-4 mt-6">
  <div className="relative w-3/4 md:w-1/2 ml-8"> {/* Cambié ml-4 a ml-8 para moverlo 2 cm más a la izquierda */}
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
    <input
      type="text"
      className="w-full px-6 py-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Ingresa el nombre de la ciudad..."
      value={search}
      onChange={handleSearchChange}
    />
  </div>
  <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 text-sm">Continuar</button>
</div>


        {/* Sugerencias de ciudades alineadas a la derecha y más pequeñas */}
        <div className="flex justify-start w-full mt-4 ml-4"> {/* Cambié ml-8 a ml-4 para moverlo 1 cm más a la derecha */}
  <div className="w-2/4 md:w-1/3 bg-[#e8e4e4] p-2 rounded-md shadow-md mb-4">
    <h3 className="text-lg font-semibold mb-2">Sugerencias</h3>
    <div className="space-y-3">
      <div className="flex flex-col items-end p-2 border-b border-gray-300">
        <p className="font-semibold">CIUDAD MANTE</p>
        <p className="text-sm font-semibold">5 km</p>
        <a href="#" className="text-blue-500 hover:underline text-sm">Click para ver clima</a>
      </div>
      <div className="flex flex-col items-end p-2">
        <p className="font-semibold">ANTIGUO MORELOS</p>
        <p className="text-sm font-semibold">25 km</p>
        <a href="#" className="text-blue-500 hover:underline text-sm">Click para ver clima</a>
      </div>
    </div>
  </div>
</div>


        {/* Mapa y botones alineados a la derecha */}
        <div className="flex justify-end mb-8 ml-4 mt-[-2cm]"> {/* Ajuste de mt-[-2cm] para mover los botones hacia arriba */}
  <Link onClick={handleMap} href=".src/components/Map" className="bg-blue-500 text-white py-4 px-10 rounded-md hover:bg-blue-600 mr-4 mb-4 md:mb-0">Ver Mapa</Link>
  <button className="bg-blue-500 text-white py-4 px-10 rounded-md hover:bg-blue-600">Resultados</button>
</div>

      </div>
    </div>
    </div></div>
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
  );
}

export default MainScreen;
