// server.js (ES Modules)
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import bcrypt from 'bcrypt';
import path from 'path';

dotenv.config();

const app = express();
const PORT = 4000;

// Conexión y setup de SQLite
let db;
async function initDB() {
  db = await open({
    filename: path.resolve(__dirname, 'database.db'),
    driver: sqlite3.Database,
  });
  // Nos aseguramos de que la tabla exista (si no la creamos)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      mother_last_name TEXT,
      dob TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log('✅ Conexión a SQLite lista y tabla users OK');
}
initDB().catch(err => {
  console.error('❌ No se pudo inicializar la base de datos:', err);
  process.exit(1);
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const USE_FAKE = process.env.USE_FAKE_VALIDATION === 'true';

// Ruta para validar email y teléfono (reutilizamos lo anterior)
app.post('/validate', async (req, res) => {
  const { email, phone } = req.body;

  let emailValid = false;
  let phoneValid = false;

  if (USE_FAKE) {
    // Modo fake: validación simple local
    emailValid = typeof email === 'string' && email.includes('@') && email.includes('.');
    phoneValid = /^\d{10}$/.test(phone);
    return res.json({ emailValid, phoneValid });
  }

  try {
    // 1) Validar correo con Mailboxlayer (HTTP para plan gratuito)
    const emailRes = await fetch(
      `http://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_KEY}&email=${encodeURIComponent(email)}`
    );
    const emailData = await emailRes.json();
    console.log('Mailboxlayer:', emailData);

    emailValid =
      emailData.format_valid === true &&
      emailData.mx_found === true;

    // 2) Validar teléfono con Numverify
    const phoneRes = await fetch(
      `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_KEY}&number=${encodeURIComponent(phone)}&country_code=MX`
    );
    const phoneData = await phoneRes.json();
    console.log('Numverify:', phoneData);

    phoneValid = phoneData.valid === true;

    return res.json({ emailValid, phoneValid });
  } catch (err) {
    console.error('🛑 Error validando externamente. Haciendo fallback local:', err);
    emailValid = typeof email === 'string' && email.includes('@') && email.includes('.');
    phoneValid = /^\d{10}$/.test(phone);
    return res.json({ emailValid, phoneValid });
  }
});

// --------------------------------------------------------
// Nueva ruta: POST /register
// Se encarga de recibir el formulario completo y guardarlo
app.post('/register', async (req, res) => {
  const { email, phone, firstName, lastName, motherLastName, dob, password } = req.body;

  // 1) Validaciones básicas
  if (
    !email ||
    !phone ||
    !firstName ||
    !lastName ||
    !dob ||
    !password
  ) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ error: 'El número de teléfono debe tener 10 dígitos numéricos.' });
  }

  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  if (birthYear > currentYear) {
    return res.status(400).json({ error: 'La fecha de nacimiento no puede ser mayor al año actual.' });
  }

  // 2) Validación de email y teléfono (llamamos a /validate internamente)
  let emailValid = false;
  let phoneValid = false;
  if (USE_FAKE) {
    emailValid = typeof email === 'string' && email.includes('@') && email.includes('.');
    phoneValid = /^\d{10}$/.test(phone);
  } else {
    try {
      const resp = await fetch(`http://localhost:${PORT}/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone }),
      });
      const data = await resp.json();
      emailValid = data.emailValid;
      phoneValid = data.phoneValid;
    } catch (err) {
      console.error('❌ Error llamando a /validate desde /register:', err);
      return res.status(500).json({ error: 'Error interno validando email/teléfono.' });
    }
  }

  if (!emailValid) {
    return res.status(400).json({ error: 'El correo no es válido o no existe.' });
  }
  if (!phoneValid) {
    return res.status(400).json({ error: 'El teléfono no es válido o no existe.' });
  }

  // 3) Checar si el email ya está registrado en la base de datos
  try {
    const existing = await db.get('SELECT id FROM users WHERE email = ?', email);
    if (existing) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }
  } catch (err) {
    console.error('❌ Error consultando existencia de usuario:', err);
    return res.status(500).json({ error: 'Error interno consultando usuario.' });
  }

  // 4) Hashear la contraseña
  let passwordHash;
  try {
    const saltRounds = 10;
    passwordHash = await bcrypt.hash(password, saltRounds);
  } catch (err) {
    console.error('❌ Error hasheando la contraseña:', err);
    return res.status(500).json({ error: 'Error interno al procesar la contraseña.' });
  }

  // 5) Insertar el usuario en la tabla
  try {
    await db.run(
      `INSERT INTO users (email, phone, first_name, last_name, mother_last_name, dob, password_hash)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, phone, firstName, lastName, motherLastName || null, dob, passwordHash]
    );
    console.log(`🆕 Usuario creado: ${email}`);
    return res.json({ success: true, message: 'Usuario registrado correctamente.' });
  } catch (err) {
    console.error('❌ Error insertando usuario en BD:', err);
    return res.status(500).json({ error: 'Error interno al guardar el usuario.' });
  }
});
// --------------------------------------------------------

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} | USE_FAKE_VALIDATION=${USE_FAKE}`);
});
