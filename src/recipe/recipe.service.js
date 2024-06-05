const { showRecipes, findFishRecipes, showRecipeDetail, addSaveRecipe, findAllSavedRecipe, findSavedRecipe } = require("./recipe.repository");

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
  return recipe
}

const getRecipesByQuery = async (query) => {
  if (!query) {
    return []
  }
  const recipesData = await findFishRecipes({ query })
  const recipes = await showRecipes(recipesData)
  return recipes
}

const saveRecipe = async (recipeData) => {
  await addSaveRecipe(recipeData)
  return { message: 'Recipe saved' }
}

const getAllRecipeSaved = async (uid) => {
  const savedRecipes = await findAllSavedRecipe(uid)
  return savedRecipes
}

const getSavedRecipeDetail = async (uid, rid) => {
  await getAllRecipeSaved(uid)
  const recipe = await findSavedRecipe(rid)
  console.log(recipe)
  if (!recipe[0]) {
    throw Error('Recipe not found')
  }
  return recipe[0]
}

module.exports = { getAllRecipe, getRecipeById, getRecipesByQuery, saveRecipe, getAllRecipeSaved, getSavedRecipeDetail }