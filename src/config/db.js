const { initializeAdmin } = require("./firebase-admin")

async function db(name) {
  const admin = await initializeAdmin()
  return admin.firestore().collection(name)
}

module.exports = db 