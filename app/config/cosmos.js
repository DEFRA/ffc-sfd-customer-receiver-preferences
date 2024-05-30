const Joi = require('joi')

const schema = Joi.object({
  endpoint: Joi.string(),
  key: Joi.string(),
  preferencesDatabase: Joi.string().default('ffc-sfd-customer-receiver-preferences'),
  preferencesContainer: Joi.string().default('preferences-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  preferencesDatabase: process.env.COSMOS_PREFERENCES_DATABASE,
  preferencesContainer: process.env.COSMOS_PREFERENCES_CONTAINER
}

const { error, value } = schema.validate(config, { abortEarly: false })

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
