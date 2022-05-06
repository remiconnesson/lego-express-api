const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const Collection = require("../Collection");
require('express-async-errors'); // bcrypt est asynchrone

const Accounts = new Collection("Accounts");
const app = express();


app.use(express.json());

app.get("/accounts", (req, res) => {
  res.json(Accounts.getAll());
});

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
