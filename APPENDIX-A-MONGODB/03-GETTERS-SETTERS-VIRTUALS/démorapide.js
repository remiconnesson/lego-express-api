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

// Démo Getters

async function démoGetters() {
  console.log("DEMO GETTERS");
  const productSchema = new mongoose.Schema({
    name: String,
    price: {
      type: Number,
      get: (price) => Math.round(price), // ICI LE GETTER EST DEFINI
    },
  });
  const Product = mongoose.model("Product", productSchema);

  const product = new Product({
    name: "Ordinateur de Gaming",
    price: 1239.9087,
  });
  console.log("avec getter:", product.price);
  console.log("avec getter:", product.get("price"));
  console.log("sans getter:", product.get("price", null, { getters: false }));
  console.log(
    "Les getters ne modifient pas la valeur sous-jacente, seulement sa réprésentation lors du get.\n"
  );
}

async function démoSetters() {
  console.log("DEMO SETTERS");
  const infoBancaireSchema = new mongoose.Schema({
    IBAN: {
      type: String,
      set: (IBAN) => IBAN.toUpperCase(), // ICI LE SETTER EST DEFINI
    },
  });

  const InfoBancaire = mongoose.model("InfoBancaire", infoBancaireSchema);

  const infoBancaire = new InfoBancaire({ IBAN: "fr3000ppxyaf707c0" });
  console.log("avec getter:", infoBancaire.IBAN);
  console.log(
    "sans getter:",
    infoBancaire.get("IBAN", null, { getters: false })
  );
  console.log(
    "Les setters modifient la valeur sous-jacente est son déclenché dès qu'on essaye de la modifier."
  );
  console.log(
    "Là je vais modifier la valeur de IBAN avec 'fr3000ibanEnMinuscule'"
  );
  infoBancaire.IBAN = "fr3000ibanEnMinuscule";
  console.log("La valeur après modification:", infoBancaire.IBAN, "\n");
}

async function démoVirtuals() {
  console.log("DEMO VIRTUALS");
  const userSchema = new mongoose.Schema({
    prenom: String,
    nomDeFamille: String,
  });
  // virtual getter
  userSchema.virtual("nomComplet").get(function () {
    return this.prenom + " " + this.nomDeFamille;
  });
  // virtual setter
  userSchema.virtual("nomComplet").set(function (nomComplet) {
    /* 
      ici on considère que ce qui sépare le prénom du nom de famille
      est le premier espace rencontré dans le nom complet.
    */
    this.prenom = nomComplet.substr(0, nomComplet.indexOf(" "));
    this.nomDeFamille = nomComplet.substr(nomComplet.indexOf(" ") + 1);
  });

  const User = mongoose.model("User", userSchema);

  const user = new User({ prenom: "Rémi", nomDeFamille: "Connesson" });
  console.log("user.nomComplet est virtuelle :", user.nomComplet);
  console.log("Je vais set user.nomComplet = 'Rémo Cannassi';");
  user.nomComplet = "Rémo Cannassi";
  console.log("user.prenom :", user.prenom);
  console.log("user.nomDeFamille :", user.nomDeFamille);
}

async function main() {
  await connexion();
  await démoGetters();
  await démoSetters();
  await démoVirtuals();
  await déconnexion();
}

main();

// module.exports = { connexion, déconnexion, User };
