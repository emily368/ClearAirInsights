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
    </div>
  );
}

export default Details;
