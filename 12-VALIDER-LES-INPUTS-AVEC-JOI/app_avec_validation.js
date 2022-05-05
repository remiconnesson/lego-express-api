const express = require("express");
const Joi = require("joi");
const db = require("../db");
const app = express();

app.use(express.json()); // inclure le parsing des objets qui arrivent en JSON

app.post("/names", (req, res) => {
  const payload = req.body;
  // validation
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  const { value, error } = schema.validate(payload);
  if (error) res.status(400).send({ erreur: error.details[0].message });

  db.insertOne(value);
  console.log(db.getAll());

  // Renvoyer l'objet créé
  res.status(201).json(payload);
});

app.listen(3000);
