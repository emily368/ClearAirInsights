// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'gondola.proxy.rlwy.net',
  port: 11546,
  user: 'root',
  password: 'WOCEHkUzJGuBEEWyZnqgtVvMtsZcsAPs',
  database: 'ClearAir'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    return;
  }
  console.log('✅ Conectado a la base de datos MySQL');
});

module.exports = connection;
