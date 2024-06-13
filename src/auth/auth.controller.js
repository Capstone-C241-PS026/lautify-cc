const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } = require("firebase/auth");
const express = require("express");
const { insertUser } = require("../user/user.repository");
const { clientAuth } = require("../config/auth");
const router = express.Router();


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signInWithEmailAndPassword(await clientAuth(), email, password)
    const accesstoken = await user.user.getIdToken(true)
    res.send({ message: "login success", data: { uid: user.user.uid, accesstoken } })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await createUserWithEmailAndPassword(await clientAuth(), email, password)
    if (!user) {
      throw Error('User is not registered')
    }
    await insertUser({
      uid: user.user.uid,
      displayName: user.user.displayName,
      username: username,
      email: user.user.email
    })
    res.status(201).send({ message: "Register success" })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.get("/logout", async (req, res) => {
  try {
    signOut(await clientAuth())
    req['currentUser'] = null
    res.status(200).send({ message: "logged out success" })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

module.exports = router