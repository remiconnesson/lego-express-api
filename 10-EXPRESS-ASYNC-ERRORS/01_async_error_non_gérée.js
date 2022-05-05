const express = require('express');
const app = express();


// essayez d'enlever le async pour constater la différence
app.get('/', async (req, res) => {
	throw new Error("Je suis un ASYNC bug")
	res.send('JE NE SERAI JAMAIS EXECUTE');
})

app.use((err, req, res, next) => {
	res.status(500).json({erreur: err.message})
})

app.listen(3000);
