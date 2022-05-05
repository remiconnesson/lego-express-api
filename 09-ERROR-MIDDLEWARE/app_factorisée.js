const express = require("express");
const app = express();

function gestionErreur(func) {
  const wrappedFunc = function (req, res, next) {
    try {
      func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return wrappedFunc;
}

app.get(
  "/",
  gestionErreur((req, res, next) => {
    throw new Error("ceci est un bug dans la route /");
    res.send("Je ne serai pas executé du à un bug");
  })
);

app.get(
  "/route2",
  gestionErreur((req, res, next) => {
    throw new Error("ceci est un bug dans la route 2");
    res.send("Je ne serai pas executé du à un bug");
  })
);

function myErrorMiddleware(err, req, res, next) {
  res.status(500).json({ erreur: err.message });
}

app.use(myErrorMiddleware);

app.listen(3000);
