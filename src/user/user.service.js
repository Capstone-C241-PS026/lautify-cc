const { findAllUser, insertUser, findUserById, editUserById } = require('./user.repository')

const getAllUser = async () => {
  const users = await findAllUser()
  if (!users) {
    throw Error('Users not found')
  }
  return users
}

const getUserById = async (uid) => {
  const user = await findUserById(uid)
  if (!user) {
    throw Error('User not found')
  }
  return user
}

const createUser = async (userData) => {
  const { uid, displayName, username, email } = userData
  if (!uid || !displayName || !username || !email) {
    throw Error('All fields must be filled')
  }
  await insertUser(userData)
  return { message: 'User created' }
}

const updateUser = async (uid, userData) => {
  await getUserById(uid)
  const { displayName, username, email } = userData
  if (!displayName || !username || !email) {
    throw Error('All fields must be filled')
  }
  await editUserById(uid, userData)
  return { message: 'User updated' }
}

module.exports = { getAllUser, createUser, updateUser, getUserById }