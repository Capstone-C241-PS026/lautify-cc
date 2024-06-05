const { users } = require("../config/db")

const findAllUser = async () => {
  const allUser = (await users.get()).docs.map(doc => doc.data())
  return allUser
}

const findUserById = async (uid) => {
  const user = (await users.doc(uid).get()).data()
  return user
}

const insertUser = async (userData) => {
  const response = await users.doc.add(userData)
  return response
}

const editUserById = async (uid, userData) => {
  response = await users.doc(uid).update(userData)
  return response
}

module.exports = { findAllUser, insertUser, findUserById, editUserById }