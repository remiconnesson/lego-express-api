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



