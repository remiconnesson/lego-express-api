const express = require('express');
const app = express();

function myErrorMiddleware(err, req, res, next) {
	res.status(500).json({erreur: err.message});
}


app.get('/', (req, res, next) => {
	try {
		throw new Error('ceci est un bug dans la route /');
		res.send('Je ne serai pas executé du à un bug');
	} catch(err) {
		next(err)
	}
})

app.get('/route2', (req, res, next) => {
	try {
		throw new Error('ceci est un bug dans la route 2');
		res.send('Je ne serai pas executé du à un bug');
	} catch(err) {
		next(err)
	}
})

app.use(myErrorMiddleware);


app.listen(3000);
