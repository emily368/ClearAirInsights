import React, { useState } from 'react';
<<<<<<< HEAD
import './animation.css';
import { useNavigate } from 'react-router-dom';

function AllergyForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllergic, setIsAllergic] = useState('');
  const [allergyDetails, setAllergyDetails] = useState('');
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAllergyChange = (event) => setIsAllergic(event.target.value);
  const handleDetailsChange = (event) => setAllergyDetails(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSurveyCompleted(true);
    setTimeout(() => navigate('/main'), 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#bce3f8] relative overflow-hidden px-4">
      {/* Imagen del personaje con pizarrón */}
      <img
        src="/tecky.png"
        alt="Personaje con pizarrón"
        className="absolute bottom-0 w-full max-w-[850px] drop-shadow-2xl"
      />

      {/* Formulario centrado */}
      <div
        className="absolute z-10 text-white text-center chalk-text px-4 py-6 bg-black/40 rounded-lg backdrop-blur-sm w-[90%] max-w-xs sm:max-w-sm md:max-w-md"
        style={{
          top: '50%',
          left: '61%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {surveyCompleted ? (
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">¡Gracias por responder!</h2>
            <p className="text-sm sm:text-base">Redirigiendo a la pantalla principal...</p>
          </div>
        ) : !isFormVisible ? (
          <>
            <h1 className="text-base sm:text-lg font-semibold mb-4 leading-snug">
              ¿Eres alérgico(a) a algún componente del aire?
            </h1>
            <button
              onClick={() => setIsFormVisible(true)}
              className="eraser-button text-base px-4 py-2"
            >
              Responder
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-base sm:text-lg">¿Eres alérgico(a)?</label>
            <div className="mb-4 text-sm sm:text-base">
              <label className="mr-4">
                <input
                  type="radio"
                  name="allergy"
                  value="Sí"
                  onChange={handleAllergyChange}
                  checked={isAllergic === 'Sí'}
                  className="mr-1"
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="allergy"
                  value="No"
                  onChange={handleAllergyChange}
                  checked={isAllergic === 'No'}
                  className="mr-1"
                />
                No
              </label>
            </div>

            {isAllergic === 'Sí' && (
              <div className="mb-4">
                <label className="block mb-1 text-sm sm:text-base">¿A qué eres alérgico(a)?</label>
                <textarea
                  value={allergyDetails}
                  onChange={handleDetailsChange}
                  rows="3"
                  className="w-full p-2 rounded text-black text-sm"
                  placeholder="Ej: Polen, polvo, etc."
                />
              </div>
            )}

            <button
              type="submit"
              className="eraser-button w-full mt-2 text-base px-4 py-2"
            >
              Continuar
            </button>
          </form>
=======
import './AllergyFrom.css';
import { useNavigate, Link } from 'react-router-dom'; 

function AllergyForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllergic, setIsAllergic] = useState(''); // Almacena la respuesta sobre alergia
  const [allergyDetails, setAllergyDetails] = useState(''); // Almacena los detalles de la alergia
  const [surveyCompleted, setSurveyCompleted] = useState(false); // Controla si la encuesta se completó
  const navigate = useNavigate(); // Hook para navegar entre páginas

  const handleLogin = () => {
    navigate('/main'); // Aquí pones la ruta a donde quieres ir
  };
  // Muestra la alerta y el formulario
  const showAlert = () => {
    alert("¡Atención! Por favor, rellena el formulario a continuación sobre tus alergias.");
    setIsFormVisible(true);
  };

  // Función para manejar el cambio de la respuesta de la alergia
  const handleAllergyChange = (event) => {
    setIsAllergic(event.target.value);
  };

  // Función para manejar los detalles adicionales de alergias (si el usuario es alérgico)
  const handleDetailsChange = (event) => {
    setAllergyDetails(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    setSurveyCompleted(true);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#bce3f8]">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        {/* Mensaje de agradecimiento después de la encuesta */}
        {surveyCompleted ? (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-[#4a8a45] mb-4">¡Gracias por responder!</h2>
            <p className="text-lg text-black-200">
              Tu respuesta nos sirve de mucho para emitir alertas en caso de que algún componente esté cerca de ti.
            </p>
          </div>
        ) : (
          <>
            {/* Alerta y botón de mostrar formulario */}
            <h1 className="text-2xl font-semibold text-center mb-4">¿Eres alérgico(a) a algún componente del aire?</h1>
            {!isFormVisible && (
              <div className="text-center mb-4">
                <button
                  onClick={showAlert}
                  className="bg-blue-500 text-white py-4 px-10 rounded-md hover:bg-blue-600"
                >
                  Responder
                </button>
              </div>
            )}

            {/* Formulario de alergias */}
            {isFormVisible && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-lg font-medium text-black-200">¿Eres alérgico(a)?</label>
                  <div className="flex items-center mt-2">
                    <label className="mr-4">
                      <input
                        type="radio"
                        name="allergy"
                        value="Sí"
                        onChange={handleAllergyChange}
                        checked={isAllergic === 'Sí'}
                        className="mr-2"
                      />
                      Sí
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="allergy"
                        value="No"
                        onChange={handleAllergyChange}
                        checked={isAllergic === 'No'}
                        className="mr-2"
                      />
                      No
                    </label>
                  </div>
                </div>

                {isAllergic === 'Sí' && (
                  <div className="mb-4">
                    <label className="block text-lg font-medium text-black-200">
                      Por favor, especifica los componentes a los que eres alérgico(a):
                    </label>
                    <textarea
                      value={allergyDetails}
                      onChange={handleDetailsChange}
                      className="w-full mt-2 p-2 border border-gray-100 rounded-md"
                      rows="4"
                      placeholder="Ejemplo: Polen, polvo, etc."
                    ></textarea>
                  </div>
                )}

                {/* Botón de continuar */}
                <Link
                onClick={handleLogin} // <- Aquí ejecutamos la función
                  href=".src/components/MainScreen"
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                >
                  Continuar
                </Link>
              </form>
            )}
          </>
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
        )}
      </div>
    </div>
  );
}

export default AllergyForm;
