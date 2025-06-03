import React, { useState } from 'react';
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
        )}
      </div>
    </div>
  );
}

export default AllergyForm;
