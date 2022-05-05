const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().min(2).max(10).required()
})

console.log('correct\n');
console.log(schema.validate({name: "Leo"}))
console.log('incorrect\n');
console.log(schema.validate({nom: "Leo"}))
console.log(schema.validate({name: "Leo", entrop:"je ne dois pas être la "}))
console.log(schema.validate({name: "L"}))
console.log(schema.validate({name: "LLLLLLLLLLL"})); // 11 chars
console.log(schema.validate({name: 12}))


console.log('\navec des ints\n');

const schema2 = Joi.object({
  name: Joi.string().min(2).max(10).required(),
  age: Joi.number().integer().min(0).required()
})

console.log(schema2.validate({name:"Leo", age:12}));
console.log(schema2.validate({name:"Leo", age:"12"}));
console.log(schema2.validate({name:"Leo", age:-1}));
console.log(schema2.validate({name:"Leo" }));
console.log(schema2.validate({age:20}));
