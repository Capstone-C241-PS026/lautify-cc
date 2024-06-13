const express = require('express');
const router = express.Router();
const { getAllUser, createUser, updateUser, getUserById } = require('./user.service');
const { verifyIdToken } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const users = await getAllUser()
    res.send(users)
  } catch (error) {
    res.status(400).send({ message: error })
  }
})

router.get('/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const user = await getUserById(uid)
    res.send(user)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post('/', verifyIdToken, async (req, res) => {
  try {
    const userData = req.body
    const response = await createUser(userData)
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.put('/:uid', verifyIdToken, async (req, res) => {
  try {
    const { uid } = req.params
    const userData = req.body
    const currentUser = req['currentUser']

    if (currentUser.uid !== uid) {
      throw Error('cannot update other user\'s data')
    }

    const response = await updateUser(uid, userData)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

module.exports = router