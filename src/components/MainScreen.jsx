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
      navigate('/main');
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
  );
}

export default MainScreen;
