const cosmosClient = require('./client')
const { cosmosConfig } = require('../config')

const preferencesDatabase = async () => {
  try {
    const { database } = await cosmosClient.databases.createIfNotExists({
      id: cosmosConfig.preferencesDatabase
    })

    await database.containers.createIfNotExists({
      id: cosmosConfig.preferencesContainer
    })

    console.log(`A CosmosDB database has been created: ${database.id}.`)

    return database
  } catch (error) {
    console.error('Error creating Cosmos instance:', error)
  }
}

module.exports = { preferencesDatabase }
