const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Collection = require("../Collection");
require("express-async-errors"); // bcrypt est asynchrone
require("dotenv").config();

if (!process.env.JWT_PRIVATE_KEY) {
  console.log(
    "Vous devez créer un fichier .env qui contient la variable JWT_PRIVATE_KEY"
  );
  process.exit(1);
}

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
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(3).max(50).required(),
  });

  const { value: account, error } = schema.validate(payload);

  if (error) res.status(400).send({ erreur: error.details[0].message });
  else {
    // AVANT D'INSCRIRE ON VERIFIE QUE LE COMPTE EST UNIQUE.
    const { id, found } = Accounts.findByProperty("email", account.email);
    if (found) res.status(400).send("Please signin instead of signup");
    // WE NEED TO HASH THE PASSWORDW
    const salt = await bcrypt.genSalt(10);
    const passwordHashed = await bcrypt.hash(account.password, salt);
    account.password = passwordHashed;

    Accounts.insertOne(account);
    res.status(201).json({
      name: account.name,
      email: account.email,
    });
  }
});

app.post("/signin", async (req, res, next) => {
  const payload = req.body;
  const schema = Joi.object({
    email: Joi.string().max(255).required().email(),
    password: Joi.string().min(3).max(50).required(),
  });

  const { value: connexion, error } = schema.validate(payload);
  console.log("1", connexion);

  if (error) res.status(400).send({ erreur: error.details[0].message });
  else {
    // ON CHERCHE LE COMPTE DANS LA DB
    const { id, found: account } = Accounts.findByProperty(
      "email",
      connexion.email
    );
    console.log(id, account);
    if (!account) {
      res.status(400).send({ erreur: "Email Invalide" });
      next();
    } else {
      // ON DOIT COMPARER LES HASH
      const passwordIsValid = bcrypt.compare(req.body.password, account.password);
      if (passwordIsValid)
        res.status(400).send({ erreur: "Mot de Passe Invalide" });
      else {
        //ON RETOURNE UN JWT
        const token = jwt.sign({ id }, process.env.JWT_PRIVATE_KEY);
        res
          .header("x-auth-token", token)
          .status(200)
          .send({ name: account.name });
      }
    }
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => {
    console.log("listening...");
  });
}

module.exports = { app, Accounts };
