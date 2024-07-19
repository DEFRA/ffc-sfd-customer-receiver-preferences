const Joi = require('joi')
const { DEVELOPMENT, TEST, PRODUCTION } = require('../constants/environments')

const schema = Joi.object({
  endpoint: Joi.string().optional(),
  key: Joi.string().optional(),
  managedIdentityClientId: Joi.string().optional(),
  preferencesDatabase: Joi.string().optional().default('ffc-sfd-customer-receiver-preferences'),
  preferencesContainer: Joi.string().optional().default('preferences-container')
})

const config = {
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
  managedIdentityClientId: process.env.AZURE_CLIENT_ID
}

const { error, value } = schema.validate(config, { abortEarly: false })

value.isDev = (process.env.NODE_ENV === DEVELOPMENT || process.env.NODE_ENV === TEST)
value.isTest = process.env.NODE_ENV === TEST
value.isProd = process.env.NODE_ENV === PRODUCTION

if (error) {
  throw new Error(`The CosmosDB config is invalid. ${error.message}`)
}

module.exports = value
