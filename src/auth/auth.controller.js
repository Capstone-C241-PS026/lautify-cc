const { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } = require("firebase/auth");
const express = require("express");
const { insertUser, editUserById } = require("../user/user.repository");
const { clientAuth } = require("../config/auth");
const { getUserById } = require("../user/user.service");
const router = express.Router();


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await signInWithEmailAndPassword(await clientAuth(), email, password)

    if (!userLogin) {
      throw Error('User is not registered')
    }

    console.log(userLogin)
    const token = await userLogin.user.getIdToken(true)
    const user = await getUserById(userLogin.user.uid)
    res.send({ message: "login success", data: { uid: user.uid, email: user.email, username: user.username, token: token, exp: userLogin.user.stsTokenManager.expirationTime } })
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