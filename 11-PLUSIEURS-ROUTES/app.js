const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send('ici traiter GET')
})

app.post('/', (req, res) => { 
	res.send('ici traiter POST')
})

app.put('/', (req, res) => {
	res.send('ici traiter PUT')
})

app.delete('/', (req, res) => {
	res.send('ici traiter DELETE')
})

app.listen(3000);
