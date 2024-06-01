const { showRecipes, findFishRecipes, showRecipeDetail } = require("./recipe.repository");

const getAllRecipe = async () => {
  const recipesData = await findFishRecipes({})
  if (!recipesData) {
    throw Error('Recipe not found')
  }
  const recipes = await showRecipes(recipesData)
  return recipes
}

const getRecipeById = async (recipeId) => {
  const recipe = await showRecipeDetail(recipeId)
  if (!recipe) {
    throw Error('Recipe not found')
  }
  return recipe
}

const getRecipesByQuery = async (query) => {
  if (!query) {
    return []
  }
  const recipesData = await findFishRecipes({ query })
  const recipes = await showRecipes(recipesData)
  if (!recipes) {
    throw Error('Recipes not found')
  }
  return recipes
}

module.exports = { getAllRecipe, getRecipeById, getRecipesByQuery }