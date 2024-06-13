const { getAuth } = require("firebase/auth")
const { initializeClient } = require("./firebase-client")
const { initializeAdmin } = require("./firebase-admin")

async function adminAuth() {
  const admin = await initializeAdmin()
  return admin.auth()
}

async function clientAuth() {
  const app = await initializeClient()
  const auth = getAuth(app)
  return auth
}

module.exports = { clientAuth, adminAuth }