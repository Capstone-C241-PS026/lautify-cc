const axios = require("axios")
require('dotenv').config()
const getSecret = require('../config/secretManager')

const recipeInstance = async () => axios.create({
  baseURL: await getSecret("RECIPE_BASE_URL"),
  params: {
    apiKey: await getSecret("RECIPE_API_KEY"),
  }
})

module.exports = { recipeInstance }