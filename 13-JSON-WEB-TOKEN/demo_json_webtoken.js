const jwt = require("jsonwebtoken");
require('dotenv').config();


const token = jwt.sign({userId: 12}, process.env.SECRET_JWT);
console.log(token);

const decoded = jwt.verify(token, process.env.SECRET_JWT);
console.log(decoded);

try {
  const notdecoded = jwt.verify(token, "PAS_LE_BON_SECRET");
}catch(exc){
  console.log('PAS LA BONNE SIGNATURE');
}

// faketoken

const token2 = jwt.sign({userId: 13}, process.env.SECRET_JWT);

const header = token.split('.')[0];
const payload = token.split('.')[1];
const signature = token2.split('.')[2];

const fakeToken = header +"."+ payload +"."+ signature
console.log("FAKE TOKEN ", fakeToken);


try {
  const failedVerification = jwt.verify(fakeToken, process.env.SECRET_JWT);
}catch(exc){
  console.log('PAS LA BONNE SIGNATURE');
}
