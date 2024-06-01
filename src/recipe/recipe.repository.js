const axios = require("axios")
const { textTranslation } = require("../utils/translate")

const findFishRecipes = async ({ recipeId, query }) => {
  const limit = 10
  if (recipeId) {
    const { data: recipe } = await axios.get(`${process.env.RECIPE_BASE_URL}/recipes/${recipeId}/information`, {
      params: {
        apiKey: process.env.RECIPE_API_KEY
      }
    })
    return recipe
  }

  const search = query ? `fish ${await textTranslation(query, 'id', 'en')}` : 'fish'
  const { data: recipes } = await axios.get(`${process.env.RECIPE_BASE_URL}/recipes/complexSearch`, {
    params: {
      apiKey: process.env.RECIPE_API_KEY,
      query: search,
      number: limit,
      addRecipeInformation: true
    }
  })

  return recipes.results
}

const showRecipes = async (recipesData) => {
  const promise = recipesData.map(async (recipe) => {
    return {
      id: recipe.id,
      title: await textTranslation(recipe.title),
      readyInMinutes: recipe.readyInMinutes,
      types: await Promise.all(recipe.dishTypes.map(async (type) => await textTranslation(type))),
      image: recipe.image,
    }
  })

  newFormatRecipe = await Promise.all(promise)
  return await newFormatRecipe
}

const showRecipeDetail = async (recipeId) => {
  const recipe = await findFishRecipes({ recipeId })
  const recipeDetail = {
    id: recipe.id,
    title: await textTranslation(recipe.title),
    readyInMinutes: recipe.readyInMinutes,
    types: await Promise.all(recipe.dishTypes.map(async (type) => await textTranslation(type))),
    image: recipe.image,
    instructions: await Promise.all(recipe.analyzedInstructions[0].steps.map(async (instruction) => await textTranslation(instruction.step))),
    ingredients: await Promise.all(recipe.extendedIngredients.map(async (ingredient) => await textTranslation(ingredient.original))),
  }
  return recipeDetail
}

module.exports = { findFishRecipes, showRecipes, showRecipeDetail }