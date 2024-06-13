const { initializeApp } = require("firebase/app");
const getSecret = require("./secretManager");
const { default: firebase } = require("firebase/compat/app");

const initializeClient = async () => {
  if (firebase.apps.length) {
    console.log('Client app already initialized');
    return firebase.app();
  }

  const clentConfig = await getSecret('web_client_key');

  const app = initializeApp(clentConfig);
  return app;
};

module.exports = { initializeClient }