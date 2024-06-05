const { users } = require("../config/db")
const { auth } = require("../config/firebase")

const findAllUser = async () => {
  const allUser = (await users.get()).docs.map(doc => doc.data())
  return allUser
}

const findUserById = async (uid) => {
  const user = (await users.doc(uid).get()).data()
  return user
}

const insertUser = async (userData) => {
  users.doc(userData.uid).set(userData)
}

const editUserById = async (uid, userData) => {
  auth.updateUser(uid, { email: userData.email, displayName: userData.displayName })
  response = await users.doc(uid).update(userData)
  return response
}

module.exports = { findAllUser, insertUser, findUserById, editUserById }