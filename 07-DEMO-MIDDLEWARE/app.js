const express = require('express');
const app = express()

// définition des middlewares
function logRequest1(req, res, next) {
	console.log("#1", req.method, req.url);
	next();
}

function logRequest2(req, res, next) {
	console.log("#2", req.method, req.url);
	next();
}

/* LES MIDDLEWARES SONT UTLISE DANS L'ORDRE OU J'APPELLE APP.USE */

// utilisation des middlewares
app.use(logRequest1); // je passe la fonction directement (comme un callbakc)
app.use(logRequest2);
app.use(logRequest2);
app.use(logRequest1); 

// définition de la route
app.get('/', (req, res) => {
	res.send('Hello world');
})

app.get('/hey', (req, res) => {
	res.send('HO');
})

app.listen(3000);
