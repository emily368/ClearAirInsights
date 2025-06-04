import React, { useState } from 'react';
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
    setSurveyCompleted(true); // Muestra mensaje
    setTimeout(() => navigate('/main'), 1500); // Redirige luego de 1.5s
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#bce3f8] relative overflow-hidden px-4">
      {/* Imagen del personaje con pizarrón */}
      <img
        src="/tecky.png"
        alt="Personaje con pizarrón"
        className="absolute bottom-0 w-full max-w-[850px] drop-shadow-2xl"
      />

      {/* Formulario o mensaje */}
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
        )}
      </div>
    </div>
  );
}

export default AllergyForm;
