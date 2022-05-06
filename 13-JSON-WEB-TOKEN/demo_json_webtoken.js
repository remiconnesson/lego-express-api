const jwt = require("jsonwebtoken");
require('dotenv').config();

if (!process.env.SECRET_JWT) {
  console.error('ERROR: Une variable d\'environnement SECRET_JWT doit existée');
  process.exit(1);
}


const token = jwt.sign({userId: 12}, process.env.SECRET_JWT);
console.log("token JWT", token);

const decoded = jwt.verify(token, process.env.SECRET_JWT);
console.log("token JWT décodé", decoded);

try {
  const notdecoded = jwt.verify(token, "PAS_LE_BON_SECRET");
}catch(exc){
  console.log("échec de jwt.verify : PAS LA BONNE SIGNATURE");
}

// faketoken

const token2 = jwt.sign({userId: 13}, process.env.SECRET_JWT);

const header = token.split('.')[0];
const payload = token.split('.')[1];
const signature = token2.split('.')[2];

const fakeToken = header +"."+ payload +"."+ signature
console.log("FAKE TOKEN : ", fakeToken);


try {
  const failedVerification = jwt.verify(fakeToken, process.env.SECRET_JWT);
}catch(exc){
  console.log('echec de la vérification du Faux Token : PAS LA BONNE SIGNATURE');
}
