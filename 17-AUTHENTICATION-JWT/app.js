/*
 *   JWT LOGIC
*/
const jwt = require('jsonwebtoken');
require('dotenv').config();
if (!process.env.JWT_SECRET_KEY) {
  console.log("ERREUR: vous devez créer une variable d'env JWT_SECRET_KEY");
  process.exit(1);
}
console.log('Reading JWT_SECRET_KEY');
// const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
console.log('TEACHER WARNING: Overriding JWT_SECRET_KEY, please remove to try you own key');
const JWT_SECRET_KEY = "12345678"

const express = require('express');
const app = express();

/*
 *           B D D
 */
const Collection = require('../Collection');
const Accounts = new Collection("Accounts");
// const Cruds = new Collection("Cruds"); // une ressource CRUD générique, ex: Todos, items d'une liste de courses, etc... 



/*
 * PRE-POPULER LA BASE DE DONNES POUR VERIFIER QUE CA FONCTIONNE
 * (juste pour des raisons pédagogiques, en vrai ne pas mettre les trucs en dessous.
 */ 

/* on va mettre des trucs en BDD pour bien séparer la logique d'Auth de la logique de Signin */

Accounts.memoryDb.set(2, {name: "Rémi", isAdmin: true});
// associated token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjUxODM2Njg3fQ.sYo75qkwzZMu7MrivJ85XjK0uOwdSHx4kurazvTkThg , associated key : 12345678

Accounts.memoryDb.set(0, {name: "PasRémi", isAdmin: false});
// associated token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNjUxODM2Njg3fQ.AyilbQC2-Bu1f_X0SUIQ72_agVBQMxaeg0nQLB0xVrI , associated key : 12345678
Accounts.id = 3; // 





/* Logique d'authentification */
function authGuard(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({erreur: "Vous devez vous connecter"})

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY); 
    req.user = decoded;
    // Le middleware a fait son boulot et peut laisser la place au suivant.
    next();
  } catch (exc) {
    return res.status(400).json({erreur: "Token Invalide"})
  }
}

app.get('/', (req, res) => {
  res.status(200).json({message: "Hello World"});
})

// ne pas laisser la possibilité de requêter un compte spécifique.
app.get('/moncompte', [authGuard], (req, res) => {
  const user = Accounts.getOne(req.user.id)

  delete user.password; // on ne veut pas transmettre le Hash.

  res.status(200).send({user});
})


// Route réservée aux admins
app.get('/compte/:id', [authGuard], (req, res) => {
  

  // ROLE BASED ACCESS
  const whoami = Accounts.getOne(req.user.id)
  if (!whoami.isAdmin) return res.status(403).json({erreur: "Vous n'avez pas le droit d'accéder à ça"})

  
  const user = Accounts.getOne(parseInt(req.params.id))
  delete user.password; // on ne veut pas transmettre le Hash.

  res.status(200).send({user});
})


// si jest run, ne pas listen...
if (process.env.NODE_ENV !== "test"){
  app.listen(3000);
}

module.exports = app;
