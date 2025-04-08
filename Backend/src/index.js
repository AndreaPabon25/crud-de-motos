const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// GET todas las motos
app.get('/motos', (req, res) => {
  db.query('SELECT * FROM motos', (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// POST nueva moto
app.post('/motos', (req, res) => {
  const { marca, modelo, cilindraje, precio } = req.body;
  db.query(
    'INSERT INTO motos (marca, modelo, cilindraje, precio) VALUES (?, ?, ?, ?)',
    [marca, modelo, cilindraje, precio],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, marca, modelo, cilindraje, precio });
    }
  );
});

// PUT actualizar moto
app.put('/motos/:id', (req, res) => {
  const { id } = req.params;
  const { marca, modelo, cilindraje, precio } = req.body;
  db.query('UPDATE motos SET marca = ?, modelo = ?, cilindraje = ?, precio = ? WHERE id = ?', [marca, modelo, cilindraje,precio, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// DELETE eliminar moto
app.delete('/motos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM motos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(3000, () => console.log('Backend corriendo en puerto 3000'));
