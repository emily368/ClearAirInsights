// server.js (ES Modules)
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
const PORT = 4000;

// Conexión a MySQL
let db;
async function initDB() {
  try {
    db = await mysql.createConnection({
      host: 'gondola.proxy.rlwy.net',
      port: 11546,
      user: 'root',
      password: 'WOCEHkUzJGuBEEWyZnqgtVvMtsZcsAPs',
      database: 'ClearAir',
    });

    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20) NOT NULL,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        mother_last_name VARCHAR(100),
        dob DATE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('✅ Conectado a MySQL y tabla users lista');
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    process.exit(1);
  }
}
initDB();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const USE_FAKE = process.env.USE_FAKE_VALIDATION === 'true';

// Ruta para validar email y teléfono
app.post('/validate', async (req, res) => {
  const { email, phone } = req.body;

  let emailValid = false;
  let phoneValid = false;

  if (USE_FAKE) {
    emailValid = typeof email === 'string' && email.includes('@') && email.includes('.');
    phoneValid = /^\d{10}$/.test(phone);
    return res.json({ emailValid, phoneValid });
  }

  try {
    const emailRes = await fetch(
      `http://apilayer.net/api/check?access_key=${process.env.MAILBOXLAYER_KEY}&email=${encodeURIComponent(email)}`
    );
    const emailData = await emailRes.json();

    emailValid = emailData.format_valid === true && emailData.mx_found === true;

    const phoneRes = await fetch(
      `http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_KEY}&number=${encodeURIComponent(phone)}&country_code=MX`
    );
    const phoneData = await phoneRes.json();

    phoneValid = phoneData.valid === true;

    return res.json({ emailValid, phoneValid });
  } catch (err) {
    console.error('🛑 Error validando externamente:', err);
    emailValid = typeof email === 'string' && email.includes('@') && email.includes('.');
    phoneValid = /^\d{10}$/.test(phone);
    return res.json({ emailValid, phoneValid });
  }
});

// Ruta de registro
app.post('/register', async (req, res) => {
  const { email, phone, firstName, lastName, motherLastName, dob, password } = req.body;

  if (!email || !phone || !firstName || !lastName || !dob || !password) {
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

  try {
    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length > 0) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }
  } catch (err) {
    console.error('❌ Error consultando existencia de usuario:', err);
    return res.status(500).json({ error: 'Error interno consultando usuario.' });
  }

  let passwordHash;
  try {
    passwordHash = await bcrypt.hash(password, 10);
  } catch (err) {
    console.error('❌ Error hasheando la contraseña:', err);
    return res.status(500).json({ error: 'Error interno al procesar la contraseña.' });
  }

  try {
    await db.execute(
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

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    return res.json({
      message: 'Login exitoso.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    return res.status(500).json({ error: 'Error interno en el login.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT} | USE_FAKE_VALIDATION=${USE_FAKE}`);
});
