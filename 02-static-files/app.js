const express = require('express')
const path = require('path');
const app = express()

// pour servir des fichiers statiques automatiquement
// càd: préciser le content-type, les lire et les envoyer
// on va utiliser notre premier middleware

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(3000);
