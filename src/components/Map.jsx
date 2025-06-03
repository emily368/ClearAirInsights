import React, { useState, useEffect } from 'react';
import avatar from '../assets/avatar.png';
import './Map.css';
import { Link } from 'react-router-dom';
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from '@react-google-maps/api';

function Map() {
  const [location, setLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");

  const apiKey = 'AIzaSyAlFxQE_hnmM5xhCj8nJTTuKsQgxvdD2Ic'; // Tu API key

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

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

  useEffect(() => {
    if (location) {
      fetchPlaceName(location.lat, location.lng).then(name => {
        setPlaceName(name);
        savePlaceToHistory(location.lat, location.lng, name);
      });
    }
  }, [location]);

  const savePlaceToHistory = (lat, lng, name) => {
    const stored = JSON.parse(localStorage.getItem("recentPlaces")) || [];
    const existsIndex = stored.findIndex(
      (p) => p.latitude === lat && p.longitude === lng
    );

    const newPlace = {
      latitude: lat,
      longitude: lng,
      name,
      isFavorite: false,
      timestamp: Date.now()
    };

    let updated;
    if (existsIndex !== -1) {
      stored.splice(existsIndex, 1);
      updated = [newPlace, ...stored];
    } else {
      updated = [newPlace, ...stored];
    }

    updated = updated.slice(0, 10);
    localStorage.setItem("recentPlaces", JSON.stringify(updated));
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Usar coords exactos
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert("No se pudo obtener la ubicación. Intenta permitir el acceso o intenta más tarde.");
          console.error("Error geolocalización:", error);
        },
        {
          enableHighAccuracy: true,  // Más precisa
          timeout: 10000,           // Tiempo máximo 10 segundos
          maximumAge: 0             // No usar caché
        }
      );
    } else {
      alert("La geolocalización no está soportada por este navegador.");
    }
  };

  const getRandomLocation = () => {
    // Centro de México, pero solo para ejemplo. Aquí puedes quitar o cambiar.
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

    setLocation({ lat: newLat, lng: newLng });
  };

  const containerStyle = {
    width: '100%',
    height: '550px',
    borderRadius: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)'
  };

  // Solo centro si no hay location
  const centerDefault = { lat: 20.0, lng: -100.0 }; // Un centro neutral en México

  if (loadError) return <div>Error cargando mapa</div>;

  return (
    <div className="bg-[#bce3f8] h-screen w-screen flex flex-col items-center">
      <div className="w-full bg-[#4a8a45] p-4 flex justify-between items-center rounded-b-xl shadow-lg">
        <div className="flex items-center">
          <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
        </div>

        <Link to="/" className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
          ← Volver al inicio
        </Link>
      </div>

      <div className="flex w-full max-w-screen-lg mt-6">
        <div className="w-2/3 p-4">
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={location || centerDefault}
              zoom={location ? 12 : 5}
              onClick={(e) => {
                setLocation({
                  lat: e.latLng.lat(),
                  lng: e.latLng.lng(),
                });
              }}
            >
              {location && <Marker position={location} />}
            </GoogleMap>
          ) : (
            <p>Cargando mapa...</p>
          )}
        </div>

        <div className="w-80 h-80 p-2 bg-[#e8e4e4] rounded-xl shadow-lg ml-auto mt-24">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">Ubicación:</h1>

          <div className="flex flex-col items-start mb-4 gap-2">
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
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mb-4 mt-4 inline-block text-center"
              >
                Ver detalles
              </Link>
            </>
          ) : (
            <div className="text-gray-400">Ubicación no seleccionada</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Map;
