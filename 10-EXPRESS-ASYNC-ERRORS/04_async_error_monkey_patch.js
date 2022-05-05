const express = require('express');
require('express-async-errors');
const app = express();


// essayez d'enlever le async pour constater qu'il n y a plus de différences.
app.get('/', async (req, res) => {
	throw new Error("Je suis un ASYNC bug")
	res.send('JE NE SERAI JAMAIS EXECUTE');
})

app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})

app.listen(3000);
