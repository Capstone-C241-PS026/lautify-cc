const axios = require("axios")
require('dotenv').config()

const recipeInstance = axios.create({
  baseURL: process.env.RECIPE_BASE_URL,
  params: {
    apiKey: process.env.RECIPE_API_KEY
  }
})

module.exports = { recipeInstance }