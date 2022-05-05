const express = require('express');
const app = express()

// définition du middleware
function logRequest(req, res, next) {
	console.log(req.method, req.url);
	next();
}

// utilisation du middleware
app.use(logRequest);

// définition de la route
app.get('/', (req, res) => {
	res.send('Hello world');
})

app.listen(3000);
