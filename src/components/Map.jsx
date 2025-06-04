import React, { useState, useEffect, useRef } from 'react';
import avatar from '../assets/avatar.png';
import './Map.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api';

function Map() {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const mapRef = useRef(null);

  const apiKey = 'AIzaSyAlFxQE_hnmM5xhCj8nJTTuKsQgxvdD2Ic';

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const navigate = useNavigate();

  const fetchPlaceName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        return data.results[0].formatted_address;
      } else {
        return "Nombre no disponible";
      }
    } catch {
      return "Error obteniendo nombre";
    }
  };

  // Guardar lugar en localStorage
  const savePlaceToHistory = (lat, lng, name) => {
    const stored = JSON.parse(localStorage.getItem("recentPlaces")) || [];
    const existsIndex = stored.findIndex(
      (p) => Math.abs(p.latitude - lat) < 0.0001 && Math.abs(p.longitude - lng) < 0.0001
    );

    const newPlace = {
      latitude: lat,
      longitude: lng,
      name,
      timestamp: Date.now()
    };

    let updated;
    if (existsIndex !== -1) {
      stored.splice(existsIndex, 1); // elimina el viejo
      updated = [newPlace, ...stored];
    } else {
      updated = [newPlace, ...stored];
    }

    updated = updated.slice(0, 10); // guardar máximo 10
    localStorage.setItem("recentPlaces", JSON.stringify(updated));
  };

  const setLocationAndName = async (lat, lng) => {
    const name = await fetchPlaceName(lat, lng);
    setPlaceName(name);
    setLocation({ lat, lng });
    savePlaceToHistory(lat, lng, name);
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  useEffect(() => {
    if (location && mapRef.current) {
      mapRef.current.panTo(location);
      mapRef.current.setZoom(12);
    }
  }, [location]);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationAndName(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          alert("No se pudo obtener la ubicación.");
          console.error("Error geolocalización:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("La geolocalización no está soportada.");
    }
  };

  const getRandomLocation = () => {
    const center = { lat: 23.6345, lng: -102.5528 };
    const radius = 500000;
    const y0 = center.lat;
    const x0 = center.lng;
    const rd = radius / 111300;
    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const newLat = y + y0;
    const newLng = x + x0;

    setLocationAndName(newLat, newLng);
  };

  const containerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  };

  const centerDefault = { lat: 20.0, lng: -100.0 };

  if (loadError) return <div>Error cargando mapa</div>;

  return (
    <div className="bg-[#bce3f8] min-h-screen w-screen flex flex-col">
      {/* Barra superior sin botón */}
      <div className="w-full bg-[#4a8a45] p-4 flex justify-between items-center rounded-b-xl shadow-lg">
        <div className="flex items-center">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
        </div>
        {/* Aquí no hay botón "Volver al inicio" */}
      </div>

      {/* Contenido principal */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-screen-xl mx-auto px-4 py-6">
        {/* Mapa */}
        <div className="w-full md:w-2/3">
          {isLoaded ? (
            <GoogleMap
              onLoad={onLoad}
              mapContainerStyle={containerStyle}
              center={location || centerDefault}
              zoom={location ? 12 : 5}
              onClick={(e) => {
                setLocationAndName(e.latLng.lat(), e.latLng.lng());
              }}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          ) : (
            <p>Cargando mapa...</p>
          )}
        </div>

        {/* Panel de acciones */}
        <div className="w-full md:w-1/3 bg-[#e8e4e4] rounded-xl shadow-lg p-4 flex flex-col">
          <h1 className="text-xl font-semibold text-gray-800 mb-4">Ubicación:</h1>

          <div className="flex flex-col gap-2 mb-4">
            <button
              onClick={getLocation}
              className="text-sm bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              📍 Usar ubicación actual
            </button>
            <button
              onClick={getRandomLocation}
              className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              🎲 Generar ubicación aleatoria
            </button>
          </div>

          {location ? (
            <>
              <p className="text-gray-800 font-semibold">{placeName}</p>
              <p className="text-gray-600 text-sm">
                Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
              </p>
              <Link
                to={`/details?lat=${location.lat}&lng=${location.lng}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 block mt-4 text-center"
              >
                Ver detalles
              </Link>
            </>
          ) : (
            <div className="text-gray-400">Ubicación no seleccionada</div>
          )}

          {/* Botón Volver al inicio */}
          <button
            onClick={() => navigate('/main')}
            className="mt-auto bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-800 mt-6"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export default Map;
