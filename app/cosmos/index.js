const { preferencesDatabase } = require('./database')

const cosmos = async () => {
  const cosmos = {}
  cosmos.preferencesDatabase = await preferencesDatabase()
  return cosmos
}

module.exports = cosmos
