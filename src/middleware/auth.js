const { adminAuth } = require("../config/auth");

const verifyIdToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Unauthorized')
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth().then(auth => auth.verifyIdToken(idToken))
    req['currentUser'] = decodedToken;
    next();
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
}

module.exports = { verifyIdToken }