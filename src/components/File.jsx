import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function File() {
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [datosHistorial, setDatosHistorial] = useState([]);
  const [datosFiltrados, setDatosFiltrados] = useState([]);
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarDatos();
  }, [search, datosHistorial]);

  useEffect(() => {
    if (location.state && location.state.lat && location.state.lng) {
      agregarDatoDesdeNavegacion(location.state);
    }
  }, [location.state]);

  const cargarDatos = () => {
    const datos = JSON.parse(localStorage.getItem('historialCalidadAire') || '[]');
    datos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    setDatosHistorial(datos);
  };

  const filtrarDatos = () => {
    if (!search) {
      setDatosFiltrados(datosHistorial);
      return;
    }
    const busqueda = search.toLowerCase();
    const filtrados = datosHistorial.filter(dato =>
      dato.nombre.toLowerCase().includes(busqueda) ||
      dato.airQualityText.toLowerCase().includes(busqueda)
    );
    setDatosFiltrados(filtrados);
  };

  const agregarDatoDesdeNavegacion = (nuevoDato) => {
    const historialActual = JSON.parse(localStorage.getItem('historialCalidadAire') || '[]');
    const entradaConFecha = { ...nuevoDato, fecha: new Date().toISOString() };
    const nuevoHistorial = [entradaConFecha, ...historialActual];
    localStorage.setItem('historialCalidadAire', JSON.stringify(nuevoHistorial));
    setDatosHistorial(nuevoHistorial);
    setMensajeConfirmacion(`Dato de "${nuevoDato.nombre}" guardado correctamente ✅`);
    setTimeout(() => setMensajeConfirmacion(''), 4000);
  };

  const handleDownloadClick = () => {
    const dataStr = JSON.stringify(datosHistorial, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    const hoy = new Date().toISOString().slice(0, 10);
    link.download = `historial_calidad_aire_${hoy}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const agruparPorMes = (datos) => {
    const grupos = {};
    datos.forEach(dato => {
      const fecha = new Date(dato.fecha);
      const mesAnio = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!grupos[mesAnio]) grupos[mesAnio] = [];
      grupos[mesAnio].push(dato);
    });
    return grupos;
  };

  const grupos = agruparPorMes(datosFiltrados);

  return (
    <div className="screen-container w-screen h-screen flex flex-col items-center justify-start p-8" style={styles.container}>
      <h1 style={styles.title}>Historial de Calidad del Aire</h1>

      {mensajeConfirmacion && (
        <div style={styles.confirmacion}>{mensajeConfirmacion}</div>
      )}

      <div style={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={styles.input}
          placeholder="Buscar por lugar o calidad..."
        />
        <button
          onClick={handleDownloadClick}
          style={styles.button}
        >
          Descargar historial
        </button>
      </div>

      <div style={{ width: '100%', maxWidth: '700px', marginTop: '20px', overflowY: 'auto', maxHeight: '70vh' }}>
        {Object.keys(grupos).length === 0 && <p>No hay datos guardados.</p>}

        {Object.entries(grupos).map(([mesAnio, datosMes]) => (
          <div key={mesAnio} style={{ marginBottom: '20px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px', color: '#0000cc', marginBottom: '10px' }}>
              {new Date(mesAnio + '-01').toLocaleString('es-ES', { month: 'long', year: 'numeric' })}
            </h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {datosMes.map((dato, idx) => (
                <li
                  key={idx}
                  style={{
                    backgroundColor: '#e0f0ff',
                    marginBottom: '10px',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 0 4px rgba(0,0,0,0.1)',
                  }}
                >
                  <strong>{dato.nombre}</strong><br />
                  Fecha: {new Date(dato.fecha).toLocaleString()}<br />
                  AQI: {dato.airQuality} ({dato.airQualityText})<br />
                  Contaminante: {dato.dominantPollutant || 'Desconocido'}<br />
                  Lat: {dato.lat.toFixed(4)}, Lng: {dato.lng.toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#bce3f8',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#0000cc',
    marginBottom: '20px',
  },
  confirmacion: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    marginBottom: '10px',
    boxShadow: '0 0 5px rgba(0,0,0,0.1)',
  },
  searchContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #bce3f8',
  },
  button: {
    backgroundColor: '#0000cc',
    color: 'white',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default File;
