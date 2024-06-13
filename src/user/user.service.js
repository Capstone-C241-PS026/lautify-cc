const { findAllUser, insertUser, findUserById, editUserById, findUserByEmail } = require('./user.repository')

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

const getUserByEmail = async (email) => {
  const user = await findUserByEmail(email)
  if (!user) {
    throw Error('User not found')
  }
  return user
}

const updateUser = async (uid, userData) => {
  const { displayName, username, email } = userData
  await getUserById(uid)

  const user = await getUserByEmail(email)
  if (user.length) {
    if (user[0].uid !== uid) {
      throw Error('Email already in use')
    }
  }

  if (!displayName || !username || !email) {
    throw Error('All fields must be filled')
  }
  await editUserById(uid, userData)
  return { message: 'User updated' }
}

module.exports = { getAllUser, createUser, updateUser, getUserById }