const { CosmosClient } = require('@azure/cosmos')
const { cosmosConfig } = require('../config')
const { DefaultAzureCredential } = require('@azure/identity')

if (cosmosConfig.isDev || cosmosConfig.isTest) {
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, key: cosmosConfig.key })
}
if (cosmosConfig.isProd) {
  const credential = new DefaultAzureCredential({ managedIdentityClientId: cosmosConfig.managedIdentityClientId })
  module.exports = new CosmosClient({ endpoint: cosmosConfig.endpoint, aadCredentials: credential })
}
