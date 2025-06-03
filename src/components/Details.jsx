import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Details.css';

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

      // Validar estructura y existencia
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
    if (airQuality === null || isNaN(airQuality)) return burroneutral; // fallback neutral
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
        <p className="text-2xl font-semibold text-white">Cargando datos de calidad del aire...</p>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Calidad del Aire</h1>

          <div className="mb-4 text-left text-gray-700">
            <p><strong>Ubicación:</strong> {placeName || 'Cargando...'}</p>
            <p><strong>Latitud:</strong> {lat.toFixed(4)}</p>
            <p><strong>Longitud:</strong> {lng.toFixed(4)}</p>
          </div>

          {airQuality !== null ? (
            <>
              <p className="text-xl mb-2">Nivel AQI: {airQuality}</p>
              <p className="text-xl font-semibold mb-4">{getAirQualityText()}</p>
              <img src={getBurroImage()} alt="Burro" className="mx-auto w-40 mb-4" />

              {dominantPollutant ? (
                <div className="text-left">
                  <h2 className="text-lg font-semibold mb-2">Principal contaminante:</h2>
                  {(() => {
                    const info = getContaminanteInfo(dominantPollutant);
                    return (
                      <div>
                        <div className="flex items-center mb-1">
                          {info.icono}
                          <span className={`font-bold ${info.color}`}>
                            {info.nombre}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 italic mt-1">
                          {info.descripcion}
                        </p>
                      </div>
                    );
                  })()}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic mt-2">No se encontró contaminante dominante.</p>
              )}

              <div className="mt-6 flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => navigate('/map')}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg"
                >
                  Volver al Mapa
                </button>
                <button
                  onClick={() => navigate('/main')}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg"
                >
                  Volver al Inicio
                </button>
                <button
                  onClick={handleGuardarDatos}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                >
                  Guardar datos
                </button>
                <button
                  onClick={toggleFavorito}
                  className={`px-4 py-2 font-semibold rounded-lg ${isFavorito ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                >
                  {isFavorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-600 font-semibold">No se pudo obtener la calidad del aire para esta ubicación.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
