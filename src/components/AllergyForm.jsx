import React, { useState } from 'react';
import './animation.css';
import { useNavigate } from 'react-router-dom';

function AllergyForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isAllergic, setIsAllergic] = useState('');
  const [allergyDetails, setAllergyDetails] = useState('');
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const navigate = useNavigate(); // minúscula por convención

  const handleAllergyChange = (event) => setIsAllergic(event.target.value);
  const handleDetailsChange = (event) => setAllergyDetails(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSurveyCompleted(true);

    // Puedes guardar la info aquí si deseas

    // Redirige a /main después de un pequeño retraso opcional
    setTimeout(() => {
      navigate('/main');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-[#bce3f8] relative overflow-hidden">
      {/* Imagen del personaje con pizarrón */}
      <img
        src="/tecky.png"
        alt="Personaje con pizarrón"
        className="absolute w-[850px] drop-shadow-2xl"
        style={{ bottom: 0 }}
      />

      {/* Contenido centrado sobre el pizarrón */}
      <div
        className="absolute z-10 text-white text-center chalk-text"
        style={{
          top: '49%',
          left: 'calc(61% - 21px)',
          transform: 'translate(-50%, -50%)',
          width: '30vw',
          maxWidth: '300px',
        }}
      >
        {surveyCompleted ? (
          <div>
            <h2 className="text-2xl font-bold text-white-300 mb-2">¡Gracias por responder! </h2>
            <p className="text-base">Redirigiendo a la pantalla principal...</p>
          </div>
        ) : (
          <>
            {!isFormVisible ? (
              <>
                <h1 className="text-xl font-semibold mb-4 leading-snug">
                  ¿Eres alérgico(a) a algún componente del aire?
                </h1>
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="eraser-button text-base bg[#bce3f8]"
                >
                  Responder
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit}>
                <label className="block mb-2 font-medium text-lg">¿Eres alérgico(a)?</label>
                <div className="mb-4 text-base">
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
                    <label className="block mb-1 text-base">¿A qué eres alérgico(a)?</label>
                    <textarea
                      value={allergyDetails}
                      onChange={handleDetailsChange}
                      rows="3"
                      className="w-full p-1 rounded text-black text-sm"
                      placeholder="Ej: Polen, polvo, etc."
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="eraser-button w-full mt-2 text-base"
                >
                  Continuar
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default AllergyForm;
