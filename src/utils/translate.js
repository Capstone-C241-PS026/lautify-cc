const translateText = require('free-google-translator-api');

const textTranslation = async (text, from = 'en', to = 'en') => {
  try {
    const translatedText = await translateText(text, from, to);
    return translatedText;
  } catch (error) {
    throw new Error(`Translation failed: ${error.message}`);
  }
};

module.exports = { textTranslation };
