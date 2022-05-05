const express = require('express');
const db = require('../db');
const app = express();

app.use(express.json()) // inclure le parsing des objets qui arrivent en JSON

app.post('/names', (req, res) => {
  const payload = req.body;
  db.insertOne(payload);
  console.log(db.getAll())

  // Renvoyer l'objet créé
  res.status(201).json(payload);
})

app.listen(3000);
