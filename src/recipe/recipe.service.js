const { getUserById } = require("../user/user.service");
const { showRecipes, findFishRecipes, showRecipeDetail, addSaveRecipe, findAllSavedRecipe, findSavedRecipe, removeSavedRecipe } = require("./recipe.repository");

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

const saveRecipe = async (uid, rid) => {
  await getUserById(uid)
  const recipeData = await showRecipeDetail(rid)
  await addSaveRecipe(uid, recipeData)
  return { message: 'Recipe saved' }
}

const getAllRecipeSaved = async (uid) => {
  await getUserById(uid)
  const savedRecipes = await findAllSavedRecipe(uid)
  return savedRecipes
}

const getSavedRecipeById = async (uid, rid) => {
  await getUserById(uid)
  const recipe = await findSavedRecipe(uid, rid)
  if (!recipe) {
    throw Error('Recipe not found')
  }
  return recipe
}

const deleteSavedRecipe = async (uid, rid) => {
  await getSavedRecipeById(uid, rid)
  await removeSavedRecipe(uid, rid)
  return { message: 'Recipe deleted' }
}

module.exports = { getAllRecipe, getRecipeById, getRecipesByQuery, saveRecipe, getAllRecipeSaved, getSavedRecipeById, deleteSavedRecipe }