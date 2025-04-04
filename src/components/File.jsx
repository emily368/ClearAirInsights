import React, { useState } from 'react';

function Screen() {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDownloadClick = () => {
    // Lógica para la descarga del archivo
    alert('Archivo descargado');
  };

  const handleSearchClick = () => {
    // Lógica para la búsqueda
    alert('Búsqueda realizada: ' + search);
  };

  return (
    <div className="screen-container w-screen h-screen flex flex-col items-center justify-center" style={styles.container}>
      {/* Título */}
      <h1 style={styles.title}>Selecciona una fecha:</h1>

      {/* Selector de fecha */}
      <div style={styles.selectContainer}>
        <select style={styles.select}>
          <option value="2025-01-15">15/01/2025</option>
          <option value="2025-03-12">12/03/2025</option>
        </select>
      </div>

      {/* Botón de "Descargar archivo" */}
      <button
        onClick={handleDownloadClick}
        style={styles.button}
      >
        Descargar archivo
      </button>

      {/* Campo de búsqueda */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          style={styles.input}
          placeholder="Buscar..."
        />
        <button
          onClick={handleSearchClick}
          style={styles.button}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}

// Estilos en línea para el componente
const styles = {
  container: {
    backgroundColor: '#bce3f8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0000cc',
    marginBottom: '20px',
  },
  selectContainer: {
    marginBottom: '20px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    width: '200px',
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
    marginTop: '10px',
  },
  searchContainer: {
    display: 'flex',
    marginTop: '20px',
    gap: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '200px',
    borderRadius: '5px',
    border: '1px solid #bce3f8',
  },
};

export default Screen;
