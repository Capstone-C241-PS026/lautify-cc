const admin = require('firebase-admin');
const getSecret = require('./secretManager');

const initializeAdmin = async () => {
  if (admin.apps.length) {
    console.log('Admin app already initialized');
    return admin;
  }

  const serviceAccountKey = await getSecret('service_account_key');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
  });
  return admin;
};


module.exports = { initializeAdmin };
