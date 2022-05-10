const mongoose = require("mongoose");
/*
 * Gestion des variables d'environnement pour créer l'URL de la base
 */
require("dotenv").config();
const variablesObligatoires = ["DB_NAME", "DB_PORT", "DB_URL", "NODE_ENV"];
const isInProcessDotEnv = (variable) => variable in process.env;

if (!variablesObligatoires.every(isInProcessDotEnv)) {
  console.error(
    variablesObligatoires,
    "doivent être présentes dans le fichier .env"
  );
  process.exit(1);
}

const { DB_NAME, DB_PORT, DB_URL, NODE_ENV } = process.env;
const dbAddress = `mongodb://${DB_URL}:${DB_PORT}/${NODE_ENV}${DB_NAME}`;

async function connexion() {
  await mongoose.connect(dbAddress);
}

async function déconnexion() {
  await mongoose.connection.close();
}

const userSchema = new mongoose.Schema({
  name: String,
  country: { type: String, lowercase: true },
  age: Number,
});

const User = mongoose.model("User", userSchema);

// VOIR LES TESTS POUR LA DEMO

module.exports = { connexion, déconnexion, User };
