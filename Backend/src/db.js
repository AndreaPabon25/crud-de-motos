const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'db', // este es el nombre del servicio en docker-compose
  user: 'root',
  password: 'root', 
  database: 'mydb',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error de conexión a MySQL:', err.message);
  } else {
    console.log('Conexión exitosa a MySQL 🚀');
  }
});

module.exports = connection;

const express = require('express');
const connection = require('./db'); // o la ruta a tu archivo de conexión

const app = express();

app.get('/test-db', (req, res) => {
  connection.query('SELECT 1 + 1 AS resultado', (err, results) => {
    if (err) return res.status(500).send('Error en la consulta');
    res.send(`Resultado de prueba: ${results[0].resultado}`);
  });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en el puerto 3000');
});