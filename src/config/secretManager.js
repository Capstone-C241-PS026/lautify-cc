const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");

const client = new SecretManagerServiceClient();

async function getSecret(name, ver = "latest") {
  const [version] = await client.accessSecretVersion({
    name: `projects/${process.env.PROJECT_ID}/secrets/${name}/versions/${ver}`,
  });
  const secretValue = JSON.parse(version.payload.data.toString());
  return secretValue
}

module.exports = getSecret