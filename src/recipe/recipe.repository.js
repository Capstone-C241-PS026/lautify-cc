const { users } = require("../config/db")
const { recipeInstance } = require("../utils/instance")
const { textTranslation } = require("../utils/translate")

const findFishRecipes = async ({ recipeId, query }) => {
  const limit = 10

  if (recipeId) {
    const { data: recipe } = await recipeInstance.get(`/recipes/${recipeId}/information`)
    console.log(recipe)
    return recipe
  }

  const search = query ? `${await textTranslation(`ikan ${query}`, 'id', 'en')}` : 'fish'
  const { data: recipes } = await recipeInstance.get(`/recipes/complexSearch`, {
    params: {
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
      rid: recipe.id,
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
    rid: recipe.id,
    title: await textTranslation(recipe.title),
    readyInMinutes: recipe.readyInMinutes,
    types: await Promise.all(recipe.dishTypes.map(async (type) => await textTranslation(type))),
    image: recipe.image,
    instructions: await Promise.all(recipe.analyzedInstructions[0].steps.map(async (instruction) => await textTranslation(instruction.step))),
    ingredients: await Promise.all(recipe.extendedIngredients.map(async (ingredient) => await textTranslation(ingredient.original))),
  }
  return recipeDetail
}

const addSaveRecipe = async (uid, recipeData) => {
  await users.doc(uid).collection('savedRecipes').doc(String(recipeData.rid)).set(recipeData)
}

const findAllSavedRecipe = async (uid) => {
  const savedRecipesRef = await users.doc(uid).collection('savedRecipes').get()
  const savedRecipes = savedRecipesRef.docs.map(doc => ({ ...doc.data() }))
  return savedRecipes
}

const findSavedRecipe = async (uid, rid) => {
  const savedRecipeRef = await users.doc(uid).collection('savedRecipes').doc(String(rid)).get()
  const savedRecipe = savedRecipeRef.data()
  return savedRecipe
}

const removeSavedRecipe = async (uid, rid) => {
  await users.doc(uid).collection('savedRecipes').doc(String(rid)).delete()
}

module.exports = { findFishRecipes, showRecipes, showRecipeDetail, addSaveRecipe, findAllSavedRecipe, findSavedRecipe, removeSavedRecipe }