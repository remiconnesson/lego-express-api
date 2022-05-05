const express = require('express');
require('express-async-errors');
// INSERER EXPRESS ASYNC ERROR AVANT D'APPELLER `express()`
const app = express();

app.get('/', (req, res) => {
	throw new Error('Je suis un bug');
	res.send("Je n'enverrai jamais ceci");
})

app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})

app.listen(3000);
