const express = require("express");
const Joi = require("joi");
const Collection = require("../Collection");
const app = express();

const Accounts = new Collection("Accounts");

app.use(express.json());

app.get("/accounts", (req, res) => {
  res.json(Accounts.getAll());
});

app.post("/signup", (req, res) => {
  const payload = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(50).required(),
  });

  const { value, error } = schema.validate(payload);

  if (error) res.status(400).send({ erreur: error.details[0].message });
  else {
    // WE NEED TO HASH THE PASSWORDW
    Accounts.insertOne(value);
    res.status(201).json({
      name: value.name,
    });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("listening...");
  });
}

module.exports = { app, Accounts };
