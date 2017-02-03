const Promise = require('bluebird')
const SQLite = require('sqlite3')
const config = require('../config.js')

const dbEngine = new SQLite.Database(config.dbPath)
// const run = Promise.promisify(dbEngine.run, { context: dbEngine })
const all = Promise.promisify(dbEngine.all, { context: dbEngine })
const get = Promise.promisify(dbEngine.get, { context: dbEngine })

const db = {
  getDbEngine: () => dbEngine,
  getRecords: (table) => {
    return all(`SELECT * FROM ${table}`)
  },
  getRecordById: (table, id) => {
    console.log(`SELECT * FROM ${table} WHERE id=${id + 0}`)
    return get(`SELECT * FROM ${table} WHERE id=${id + 0}`)
  },
  saveRecord: (table, rec) => {
    const keys = Object.keys(rec)
    const values = keys.map(k => `"${rec[k]}"`)

    const keysStr = `(${keys.join(',')})`
    const valStr = `(${values.join(',')})`

    const q = (rec.id)
      ? `UPDATE ${table} SET ${keysStr} = ${valStr} WHERE id=${rec.id}`
      : `INSERT INTO ${table} ${keysStr} VALUES ${valStr}`

    console.log(q)

    const p = new Promise((res, rej) => {
      dbEngine.run(q,
        function dbRunCallback(err) {
          if (err) return rej(err)
          if (rec.id)
            return res({ id: rec.id })
          else
            return res({ id: this.lastID })
        })
    }).then(r => db.getRecordById(table, r.id))
    .catch(e => console.error(e))
    return p
  },
}

module.exports = db
