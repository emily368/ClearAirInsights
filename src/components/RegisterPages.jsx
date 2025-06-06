import React, { useState, useEffect } from 'react';
import './RegisterPages.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function RegisterPages() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(null);

  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [motherLastName, setMotherLastName] = useState('');
  const [dob, setDob] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email) validateEmail();
      if (phone.length === 10) validatePhone();
    }, 500);
    return () => clearTimeout(timer);
  }, [email, phone]);

  useEffect(() => {
    checkPasswordStrength(password);
  }, [password]);

  const validateEmail = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone: '' }),
      });
      const data = await response.json();
      setEmailValid(data.emailValid);
    } catch (error) {
      setEmailValid(false);
    }
  };

  const validatePhone = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: '', phone }),
      });
      const data = await response.json();
      setPhoneValid(data.phoneValid);
    } catch (error) {
      setPhoneValid(false);
    }
  };

  const checkPasswordStrength = (pwd) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (strongRegex.test(pwd)) {
      setPasswordStrength(3);
    } else if (pwd.length >= 6) {
      setPasswordStrength(2);
    } else if (pwd.length > 0) {
      setPasswordStrength(1);
    } else {
      setPasswordStrength(0);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !phone || !firstName || !lastName || !dob || !password || !confirmPassword) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert('El número de teléfono debe tener exactamente 10 dígitos numéricos.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    if (birthYear > currentYear) {
      alert('La fecha de nacimiento no puede ser mayor al año actual.');
      return;
    }

    if (!emailValid) {
      alert('El correo no es válido o no existe.');
      return;
    }

    if (!phoneValid) {
      alert('El número de teléfono no es válido o no existe.');
      return;
    }

    const userData = {
      email, phone, firstName, lastName, motherLastName, dob, password,
    };

    localStorage.setItem('user_' + email, JSON.stringify(userData));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login');
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1: return 'Débil';
      case 2: return 'Media';
      case 3: return 'Fuerte';
      default: return '';
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return 'bg-red-400';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#bce3f8]">
      <div className="w-screen max-w-2xl p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-[#0000cc] mb-4 text-center">Registrarse</h1>
        <form onSubmit={handleRegister}>

          {/* Email y Teléfono */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-xs font-medium">Correo electrónico *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="correo@ejemplo.com"
              />
              {email && (
                <p className={`text-xs mt-1 ${emailValid ? 'text-green-600' : 'text-red-600'}`}>
                  {emailValid === null ? '' : emailValid ? 'Correo válido' : 'Correo no válido'}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-medium">Teléfono *</label>
              <input
                type="tel"
                value={phone}
                onChange={e => {
                  const onlyNums = e.target.value.replace(/\D/g, '');
                  setPhone(onlyNums);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="1234567890"
                maxLength={10}
              />
              {phone && (
                <p className={`text-xs mt-1 ${phoneValid ? 'text-green-600' : 'text-red-600'}`}>
                  {phoneValid === null ? '' : phoneValid ? 'Teléfono válido' : 'Teléfono no válido'}
                </p>
              )}
            </div>
          </div>

          {/* Nombre completo */}
          <div className="mb-4 flex gap-4">
            <input
              type="text"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              placeholder="Nombre(s) *"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              placeholder="Apellido paterno *"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4 flex gap-4">
            <input
              type="text"
              value={motherLastName}
              onChange={e => setMotherLastName(e.target.value)}
              placeholder="Apellido materno"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Contraseña */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Contraseña *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-[10px] text-gray-600">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="w-full h-2 mt-2 rounded bg-gray-200">
                <div className={`h-2 rounded ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength * 33.3}%` }}></div>
              </div>
              <p className="text-xs mt-1">{getPasswordStrengthText()}</p>
            </div>

            <div className="w-1/2 relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirmar contraseña *"
                className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-2 top-[10px] text-gray-600">
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <p className="text-center text-sm mt-4 text-black">
            Al crear una cuenta, aceptas las <a href="#" className="text-blue-500">Condiciones de Uso</a> y el <a href="#" className="text-blue-500">Aviso de Privacidad</a>.
          </p>

          <div className="flex justify-center mt-6">
            <button type="submit" className="w-1/2 bg-[#4caf50] text-white font-bold py-2 px-4 rounded-lg text-lg">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPages;
