import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './components/LoginPages';
import MainScreen from './components/MainScreen'; // IMPORTANTE
import RegisterPages from './components/RegisterPages';
import ForgotPassword from './components/ForgotPassword';
import Map from './components/Map';
import AllergyForm from './components/AllergyForm';
import Details from './components/Details';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages />} /> 
        <Route path="/main" element={<MainScreen />} /> {/* RUTA para MainScreen */}
        <Route path="/register" element={<RegisterPages />} /> {/* RUTA para Register */}
        <Route path="/password" element={<ForgotPassword />} /> 
        <Route path="/map" element={<Map />} /> 
        <Route path="/test" element={<AllergyForm />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;