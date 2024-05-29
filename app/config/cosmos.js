const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string().required(),
  key: Joi.string().required(),
  preferencesDatabase: Joi.string().required(),
  preferencesContainer: Joi.string().required()
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  preferencesDatabase: 'ffc-sfd-customer-receiver-preferences',
  preferencesContainer: 'preferences-container'
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
