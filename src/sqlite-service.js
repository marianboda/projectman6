const Promise = require('bluebird')
const SQLite = require('sqlite3')
const config = require('../config.js')

const dbEngine = new SQLite.Database(config.dbPath)
// const run = Promise.promisify(dbEngine.run, { context: dbEngine })
const all = Promise.promisify(dbEngine.all, { context: dbEngine })

const db = {
  getDbEngine: () => dbEngine,
  getRecords: (table) => {
    return all(`SELECT * FROM ${table}`)
  },
}

module.exports = db
