const express = require('express');
const app = express() 

/* la convention c'est dappeler notre variable
`app` au lieu de `server` quand on utilise `express`
*/

app.get('/', (req, res) => {
	res.send("Hello World");
	// il faut appeller une méthode d'express pour 
	// terminer la requête,
	// ici , res.send() le fait pour nous
})

app.listen(3000);
