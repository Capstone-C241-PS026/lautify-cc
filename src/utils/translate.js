const { translate } = require('bing-translate-api');

const textTranslation = async (text, from = 'en', to = 'id') => {
  const { translation } = await translate(text, from, to)
  return translation
}
module.exports = { textTranslation } 