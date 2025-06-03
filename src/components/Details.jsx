<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import burrofeliz from '../assets/BurroFeliz.jpeg';
import burroneutral from '../assets/BurroNeutral.jpeg';
import burrotriste from '../assets/BurroTriste.jpeg';

import { GiDustCloud, GiGasMask, GiChemicalDrop } from 'react-icons/gi';
import { WiSmoke, WiDaySunny, WiRaindrop } from 'react-icons/wi';

function Details() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = parseFloat(searchParams.get('lat'));
  const lng = parseFloat(searchParams.get('lng'));

  const [airQuality, setAirQuality] = useState(null);
  const [dominantPollutant, setDominantPollutant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placeName, setPlaceName] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);

  const API_KEY = 'AIzaSyBlLN8MB28rWwOJAI6tuSxsGC9_WNbm39M';

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      fetchAirQuality(lat, lng);
      fetchPlaceName(lat, lng);
      checkFavorito(lat, lng);
    } else {
      console.error("Lat o Lng no son válidos");
      setLoading(false);
    }
  }, [lat, lng]);

  const fetchAirQuality = async (lat, lng) => {
    try {
      const response = await axios.post(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${API_KEY}`,
        { location: { latitude: lat, longitude: lng } }
      );

      const indexes = response.data?.indexes;
      if (indexes && indexes.length > 0) {
        setAirQuality(indexes[0].aqi);
        setDominantPollutant(indexes[0].dominantPollutant || null);
      } else {
        setAirQuality(null);
        setDominantPollutant(null);
      }
    } catch (error) {
      console.error('Error al obtener la calidad del aire:', error);
      setAirQuality(null);
      setDominantPollutant(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceName = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      );
      const results = response.data.results;
      if (results && results.length > 0) {
        setPlaceName(results[0].formatted_address);
      } else {
        setPlaceName("Ubicación desconocida");
      }
    } catch (error) {
      console.error("Error obteniendo el nombre del lugar:", error);
      setPlaceName("Ubicación desconocida");
    }
  };

  const checkFavorito = (lat, lng) => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const existe = favoritos.some(fav => fav.lat === lat && fav.lng === lng);
    setIsFavorito(existe);
  };

  const toggleFavorito = () => {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (isFavorito) {
      const nuevos = favoritos.filter(fav => !(fav.lat === lat && fav.lng === lng));
      localStorage.setItem('favoritos', JSON.stringify(nuevos));
      setIsFavorito(false);
    } else {
      favoritos.push({ lat, lng, placeName });
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      setIsFavorito(true);
    }
  };

  const getBurroImage = () => {
    if (airQuality === null || isNaN(airQuality)) return burroneutral;
    if (airQuality <= 50) return burrofeliz;
    if (airQuality <= 100) return burroneutral;
    return burrotriste;
  };

  const getAirQualityText = () => {
    if (airQuality === null || isNaN(airQuality)) return 'Datos no disponibles';
    if (airQuality <= 50) return 'Buena';
    if (airQuality <= 100) return 'Aceptable';
    if (airQuality <= 150) return 'Mala';
    if (airQuality <= 200) return 'Muy Mala';
    return 'Extremadamente Mala';
  };

  const getContaminanteInfo = (codigo) => {
    const info = {
      pm2_5: {
        nombre: 'Material Particulado Fino (PM2.5)',
        icono: <GiDustCloud className="text-yellow-600 text-2xl mr-2" />,
        color: 'text-yellow-600',
        descripcion: 'Penetra profundamente en los pulmones, puede causar enfermedades respiratorias.',
      },
      pm10: {
        nombre: 'Material Particulado Grueso (PM10)',
        icono: <WiSmoke className="text-orange-500 text-2xl mr-2" />,
        color: 'text-orange-500',
        descripcion: 'Puede irritar ojos, nariz y garganta, y agravar condiciones respiratorias.',
      },
      o3: {
        nombre: 'Ozono (O₃)',
        icono: <WiDaySunny className="text-green-500 text-2xl mr-2" />,
        color: 'text-green-500',
        descripcion: 'Puede causar dificultad respiratoria y dañar tejidos pulmonares.',
      },
      no2: {
        nombre: 'Dióxido de Nitrógeno (NO₂)',
        icono: <GiGasMask className="text-red-500 text-2xl mr-2" />,
        color: 'text-red-500',
        descripcion: 'Reduce la función pulmonar y puede causar inflamación respiratoria.',
      },
      so2: {
        nombre: 'Dióxido de Azufre (SO₂)',
        icono: <GiChemicalDrop className="text-purple-600 text-2xl mr-2" />,
        color: 'text-purple-600',
        descripcion: 'Irrita las vías respiratorias y puede provocar ataques de asma.',
      },
      co: {
        nombre: 'Monóxido de Carbono (CO)',
        icono: <WiRaindrop className="text-gray-600 text-2xl mr-2" />,
        color: 'text-gray-600',
        descripcion: 'Reduce la capacidad de la sangre para transportar oxígeno.',
      }
    };

    return info[codigo] || {
      nombre: codigo?.toUpperCase() || 'Desconocido',
      icono: <GiGasMask className="text-gray-700 text-2xl mr-2" />,
      color: 'text-gray-700',
      descripcion: 'Contaminante no identificado.',
    };
  };

  const handleGuardarDatos = () => {
    navigate('/file', {
      state: {
        lat,
        lng,
        airQuality,
        dominantPollutant,
        airQualityText: getAirQualityText(),
        placeName,
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500 p-4">
      {loading ? (
        <p className="text-2xl font-semibold text-white text-center">Cargando datos de calidad del aire...</p>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Calidad del Aire</h1>

          <div className="mb-6 text-left text-gray-700 space-y-1 text-sm sm:text-base">
            <p><strong>Ubicación:</strong> {placeName || 'Cargando...'}</p>
            <p><strong>Latitud:</strong> {lat.toFixed(4)}</p>
            <p><strong>Longitud:</strong> {lng.toFixed(4)}</p>
          </div>

          {airQuality !== null ? (
            <>
              <p className="text-lg sm:text-xl mb-2 font-medium">Nivel AQI: {airQuality}</p>
              <p className="text-lg sm:text-xl font-semibold mb-4">{getAirQualityText()}</p>
              <img
                src={getBurroImage()}
                alt="Burro"
                className="mx-auto w-32 sm:w-40 mb-6 max-w-full h-auto"
              />

              {dominantPollutant ? (
                <div className="text-left mb-6">
                  <h2 className="text-lg font-semibold mb-2">Principal contaminante:</h2>
                  {(() => {
                    const info = getContaminanteInfo(dominantPollutant);
                    return (
                      <div>
                        <div className="flex items-center mb-1">
                          {info.icono}
                          <span className={`font-bold ${info.color} text-base sm:text-lg`}>
                            {info.nombre}
                          </span>
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 italic mt-1">
                          {info.descripcion}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-sm sm:text-base text-gray-500 italic mb-6">
                  No se encontró contaminante dominante.
                </p>
              )}

              <div className="mt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => navigate('/map')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg min-w-[140px]"
                >
                  Volver al Mapa
                </button>
                <button
                  onClick={() => navigate('/main')}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg min-w-[140px]"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={handleGuardarDatos}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg min-w-[140px]"
                >
                  Guardar datos
                </button>
                <button
                  onClick={toggleFavorito}
                  className={`px-4 py-2 font-semibold rounded-lg min-w-[140px] ${
                    isFavorito
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  {isFavorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-600 font-semibold text-base sm:text-lg">
              No se pudo obtener la calidad del aire para esta ubicación.
            </p>
          )}
        </div>
      )}
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Details.css';

function Details() {
  const [selectedCity, setSelectedCity] = useState('');
  const [airQuality, setAirQuality] = useState('');
  const [location, setLocation] = useState(null); // Estado para almacenar la ubicación
  const [error, setError] = useState(null); // Estado para manejar errores de ubicación
  const [cityCoordinates, setCityCoordinates] = useState(null); // Coordenadas de la ciudad seleccionada
  
  // Clave de la API de OpenWeatherMap (reemplázala con tu propia clave)
  const apiKey = 'TU_CLAVE_DE_API_AQUI';

  // Función para obtener la calidad del aire basado en las coordenadas de la ubicación
  const fetchAirQuality = async (lat, lon) => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
      const airData = response.data.list[0].main.aqi;

      // Establecer el nivel de calidad del aire según la respuesta de la API
      switch (airData) {
        case 1:
          setAirQuality('Buena');
          break;
        case 2:
          setAirQuality('Aceptable');
          break;
        case 3:
          setAirQuality('Mala');
          break;
        case 4:
          setAirQuality('Muy mala');
          break;
        case 5:
          setAirQuality('Extremadamente malo');
          break;
        default:
          setAirQuality('Desconocido');
      }
    } catch (error) {
      console.error('Error al obtener la calidad del aire:', error);
      setAirQuality('Desconocido');
    }
  };

  // Función para obtener la coordenada de la ciudad usando la API de OpenCage Geocoding (requiere una API Key)
  const fetchCityCoordinates = async (city) => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${city}&key=TU_CLAVE_DE_API_DE_GEOCODIFICACION`);
      const results = response.data.results;
      
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;
        setCityCoordinates({ lat, lon: lng });
        fetchAirQuality(lat, lng); // Llamar a la API de calidad del aire
      } else {
        setError('Ciudad no encontrada');
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas de la ciudad:', error);
      setError('No se pudo obtener la ubicación de la ciudad.');
    }
  };

  // Función para manejar el cambio del campo de entrada de la ciudad
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleCitySubmit = (event) => {
    event.preventDefault();
    if (selectedCity) {
      fetchCityCoordinates(selectedCity); // Obtener las coordenadas de la ciudad seleccionada
    }
  };

  // Estilo y mensajes según la calidad del aire
  const getAirQualityMessage = () => {
    switch (airQuality) {
      case 'Mala':
        return (
          <>
            <h2 className="text-2xl font-semibold text-orange-600">¡TU UBICACIÓN TIENE UNA CALIDAD DE AIRE “MALA”!</h2>
            <p className="text-lg mt-4">SE RECOMIENDA EL USO DE CUBREBOCAS</p>
          </>
        );
      case 'Buena':
        return (
          <>
            <h2 className="text-2xl font-semibold text-green-600">¡GENIAL!</h2>
            <p className="text-lg mt-4">LA CALIDAD DE AIRE DE TU UBICACIÓN SE CONSIDERA “BUENA” TEN UNA BUENA TARDE.</p>
          </>
        );
      case 'Aceptable':
        return (
          <>
            <h2 className="text-2xl font-semibold text-yellow-500">La calidad del aire es ACEPTABLE.</h2>
            <p className="text-lg mt-4">No es necesario usar cubrebocas, pero mantén precaución.</p>
          </>
        );
      case 'Muy mala':
        return (
          <>
            <h2 className="text-2xl font-semibold text-red-800">¡ALERTA! La calidad del aire es MUY MALA.</h2>
            <p className="text-lg mt-4">SE RECOMIENDA EL USO DE CUBREBOCAS Y EVITAR ACTIVIDADES AL AIRE LIBRE.</p>
          </>
        );
      case 'Extremadamente malo':
        return (
          <>
            <h2 className="text-2xl font-semibold text-purple-700">¡ALERTA EXTREMA! La calidad del aire es EXTREMADAMENTE MALA.</h2>
            <p className="text-lg mt-4">SE RECOMIENDA EL USO DE CUBREBOCAS Y EVITAR TODA ACTIVIDAD EXTERIOR.</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#bce3f8]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Calidad del Aire en tu Ubicación</h1>

        {/* Mostrar el mensaje de error si es necesario */}
        {error && <p className="text-red-600">{error}</p>}

        {/* Formulario de entrada de ciudad */}
        <form onSubmit={handleCitySubmit} className="mb-6">
          <input
            type="text"
            value={selectedCity}
            onChange={handleCityChange}
            placeholder="Ingresa el nombre de la ciudad"
            className="w-full p-2 border rounded-md mb-4"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Ver calidad del aire
          </button>
        </form>

        {/* Mostrar las coordenadas de la ciudad seleccionada */}
        {cityCoordinates && (
          <h2 className="text-xl font-semibold text-center mb-4">
            Coordenadas: {cityCoordinates.lat.toFixed(2)}, {cityCoordinates.lon.toFixed(2)}
          </h2>
        )}

        {/* Mostrar el mensaje según la calidad del aire */}
        <div className="mt-6 text-center">
          {getAirQualityMessage()}
        </div>
      </div>
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
    </div>
  );
}

export default Details;
