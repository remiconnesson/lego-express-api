const express = require('express');
const app = express();

function logRequest(req, res, next) {
	console.log(req.method, req.url);
	next();
}

app.get('/', (req, res) => {
	res.send('Hello world');
})

app.listen(3000);
