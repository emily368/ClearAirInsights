import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LoginPages from './components/LoginPages.jsx';
import RegisterPages from './components/RegisterPages.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import MainScreen from './components/MainScreen.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import Map from './components/Map.jsx';
import AllergyForm from './components/AllergyForm.jsx';
import Details from './components/Details.jsx';
<<<<<<< HEAD
import File from './components/File.jsx';
=======
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/",element:<App/>},
  {path: "/login",element:<LoginPages/>},
  {path: "/main",element:<MainScreen/>},
  {path: "/register",element:<RegisterPages/>},
  {path: "/password",element:<ForgotPassword/>},
  {path: "/map",element:<Map/>},
  {path: "/test",element:<AllergyForm/>},
  {path: "/details",element:<Details/>},
<<<<<<< HEAD
  {path: "/file",element:<File/>},
=======
>>>>>>> 5dfc72143972e5a41d2bcdcc99e79db7995d15d6
  {path: "*",element:<NotFoundPage/>},
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)

