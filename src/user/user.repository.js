
const { adminAuth } = require("../config/auth")
const db = require("../config/db")
const { initializeAdmin } = require("../config/firebase-admin")

const findAllUser = async () => {
  const allUser = (await db("users").then(query => query.get())).docs.map(doc => doc.data())
  return allUser
}

const findUserById = async (uid) => {
  const user = (await db("users").then(query => query.doc(uid).get())).data()
  return user
}

const findUserByEmail = async (email) => {
  const user = (await db("users").then(query => query.where("email", "==", email).get())).docs.map(doc => doc.data())
  return user
}

const insertUser = async (userData) => {
  db("users").then(query => query.doc(userData.uid).set(userData))
}

const editUserById = async (uid, userData) => {
  adminAuth().then(auth => auth.updateUser(uid, { email: userData.email, displayName: userData.displayName }))
  response = await db("users").then(query => query.doc(uid).update(userData))
  return response
}

module.exports = { findAllUser, insertUser, findUserById, editUserById, findUserByEmail }