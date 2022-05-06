const bcrypt = require("bcrypt"); // MODULE POUR HASHER LES PASSWORDS
const Joi = require("joi"); // POUR FAIRE LA VALDIATION DES INPUTS

const express = require("express");
require('express-async-errors'); // bcrypt est asynchrone
const app = express();

const Collection = require("../Collection");
const Accounts = new Collection("Accounts");



app.use(express.json());

// requête facultative pour débug.
app.get("/accounts", (req, res) => {
  res.json(Accounts.getAll());
});

// LA LOGIQUE D'INSCRIPTION AVEC LE HAS 
app.post("/signup", async (req, res) => {
  const payload = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
  });


  const { value, error } = schema.validate(payload);

  if (error) res.status(400).send({ erreur: error.details[0].message });
  else {
    const account = value;
    // WE NEED TO HASH THE PASSWORDW
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(account.password, salt);
    account.password = passwordHashed;

    Accounts.insertOne(account);
    res.status(201).json({
      name: account.name,
    });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("listening...");
  });
}

module.exports = { app, Accounts };
