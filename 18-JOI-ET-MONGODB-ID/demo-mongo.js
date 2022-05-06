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

async function createUser(obj){

  // ici l'objet n'exite pas en BDD.
  const user = new User(obj)
  // ici l'objet n'exite pas non plus en BDD.

  return user.save() // je peux await pcq c'est une promesse.
}

const p1 = createUser({name: "Rémi",
  username: "rémirémi",
  isAdmin: true,
  age: 18});

const p2 = createUser({name: "Roma",
  username: "dqdqsopq",
  isAdmin: false,
  age: 28});



Promise.all([p1, p2])
  .then(async () => {
    const all_docs = await User.find();
    console.log(all_docs);

    const filtered_docs = await User.find({name:"Rémi"})
    console.log(filtered_docs)

    const oneUser = await User.findOne();
    console.log(oneUser);
    console.log(oneUser._id);

    oneUser.name = "MODIFIED";

    const result = await oneUser.save()

    console.log(result);

    mongoose.connection.close()})
