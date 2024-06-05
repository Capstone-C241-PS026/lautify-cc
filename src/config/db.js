const { db } = require("../config/firebase")

const users = db.collection('users')

module.exports = { users }