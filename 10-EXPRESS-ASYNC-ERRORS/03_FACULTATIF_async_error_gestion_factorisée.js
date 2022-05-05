/*
 * La compréhension de ce fichier n'est pas nécessaire
 * pour votre succès dans le cours.
 * Vous pouvez soit
 * 1. utiliser la recette du fichier 02
 * 2. utiliser la recette ici, même sans bien comprendre.
 * 3. utiliser le monkey patch de express-async-errors comme dans le fichier 04
 *
 * N.B.: [FACULTATIF] L'outil javascript utilisé ici s'appelle une Closure ou Higher Order Function.
 */

const express = require("express");
const app = express();

function gestionErreurAsync(func) {
  /* Le tryCatchWrapper ci-dessous,
   * doit accepter les mêmes arguments que le callback de la route.
   */
  async function tryCatchWrapper(req, res, next) {
    try {
      const result = await func(req, res, next);
    } catch (exc) {
      next(exc);
    }
  }

  return tryCatchWrapper;
}

// Nous pouvons nous contenter de passer req et res si
//  notre callback de route ne l'utilise pas.
app.get(
  "/",
  gestionErreurAsync(async (req, res) => {
    throw new Error("Je suis un ASYNC bug");
    res.send("JE NE SERAI JAMAIS EXECUTE");
  })
);

app.use((err, req, res, next) => {
  res.status(500).json({ erreur: err.message });
});

app.listen(3000);
