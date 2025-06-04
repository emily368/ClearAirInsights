import { Routes, Route } from 'react-router-dom';
import LoginPages from './components/LoginPages';
import MainScreen from './components/MainScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './components/LoginPages';
import MainScreen from './components/MainScreen'; // IMPORTANTE
import RegisterPages from './components/RegisterPages';
import ForgotPassword from './components/ForgotPassword';
import Map from './components/Map';
import AllergyForm from './components/AllergyForm';
import Details from './components/Details';
import File from './components/File';
import Favoritos from './components/Favoritos';
import Account from './components/Account';
import About from './components/About';
import NotFoundPage from './components/NotFoundPage'; // <-- Asegúrate de tener esto

import './animation.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPages />} />
      <Route path="/register" element={<RegisterPages />} />
      <Route path="/password" element={<ForgotPassword />} />
      <Route path="/map" element={<Map />} />
      <Route path="/test" element={<AllergyForm />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/details" element={<Details />} />
      <Route path="/file" element={<File />} />
      <Route path="/favoritos" element={<Favoritos />} />
      <Route path="/account" element={<Account />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}



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

