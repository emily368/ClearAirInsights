import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './components/LoginPages';
import MainScreen from './components/MainScreen'; // IMPORTANTE
import RegisterPages from './components/RegisterPages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages />} /> 
        <Route path="/main" element={<MainScreen />} /> {/* RUTA para MainScreen */}
        <Route path="/register" element={<RegisterPages />} /> {/* RUTA para Register */}
      </Routes>
    </Router>
  );
}

export default App;