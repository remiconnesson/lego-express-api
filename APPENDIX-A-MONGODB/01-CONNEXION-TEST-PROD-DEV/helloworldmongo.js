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
console.log(dbAddress);

const mongoose = require("mongoose");
async function main() {
  console.log("Connexion à mongodb...");
  await mongoose.connect(dbAddress);
  console.log("... réussie.");

  console.log("Insertion d'un document Hello World ...");
  const HelloWorld = mongoose.model("HelloWorld", { message: String });
  const helloworld = new HelloWorld({ message: "Hello, World!" });
  await helloworld.save();
  console.log("... réussie.");

  console.log("Fermeture de la connexion...");
  await mongoose.connection.close();
  console.log("... réussie.");
}

main();
