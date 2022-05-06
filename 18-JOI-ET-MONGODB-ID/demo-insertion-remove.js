const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demojs')
  .then(() => console.log('Connected to mongo'))
  .catch((err) => console.error('Pas pu se connecter,', err))

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  creation: {type: Date, default: Date.now()},
  isAdmin: Boolean,
  age: Number
});


const User = mongoose.model('User', userSchema);

async function createUser(){

  const user = new User({name: "Rémi",
  username: "rémirémi",
  isAdmin: true,
  age: 18})

  try {
  const result = await user.save() // je peux await pcq c'est une promesse.
  const result2 = await User.remove({}) // normalement tout supprimé : pour jest par exemple.
  } catch (exc) {
    // ici on gère les cas où la promesse échoue
  }
}

createUser();

