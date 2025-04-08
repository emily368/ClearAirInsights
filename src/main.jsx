import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import LoginPages from './components/LoginPages.jsx';
import RegisterPages from './components/RegisterPages.jsx';
import ForgotPassword from './components/ForgotPassword.jsx';
import MainScreen from './components/MainScreen.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {path: "/",element:<App/>},
  {path: "Login",element:<LoginPages/>},
  {path: "Register",element:<RegisterPages/>},
  {path: "ForgotPassword",element:<ForgotPassword/>},
  {path: "MainScreen",element:<MainScreen/>},
  {path: "*",element:<NotFoundPage/>},
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <RouterProvider router={router}/>
  </StrictMode>,
)

