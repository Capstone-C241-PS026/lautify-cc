const { db } = require("../config/firebase")

const users = db.collection('users')
const recipes = db.collection('recipes')

module.exports = { users, recipes }