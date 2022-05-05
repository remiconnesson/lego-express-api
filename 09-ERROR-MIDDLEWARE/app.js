const express = require('express');
const app = express();

function myErrorMiddleware(err, req, res, next){
	res.send(500).json({erreur: err.message});
}

app.get('/', (req, res) => {
	throw new Error('ceci est un bug');
})

app.use(myErrorMiddleware);



app.listen(3000);
