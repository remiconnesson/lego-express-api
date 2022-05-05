const express = require("express");
const app = express();

/* Pour que l'erreur soit gérée il faut
1. ajouter `next` comme paramètre du callback
2. try, catcher la route
3. passer l'erreur attrapée dans la fonction `next`
*/
app.get("/", async (req, res, next) => {
  try {
    throw new Error("Je suis un ASYNC bug");
    res.send("JE NE SERAI JAMAIS EXECUTE");
  } catch (exc) {
    next(exc);
  }
});

app.use((err, req, res, next) => {
  res.status(500).json({ erreur: err.message });
});

app.listen(3000);
