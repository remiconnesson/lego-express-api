const Joi = require('joi');
//  installer npm i joi-objectid
Joi.objectId = require('joi-objectid')(Joi)

const schema = Joi.object({
  id: Joi.objectId(),
  name: Joi.string().max(100),
  date: Joi.date()
})
