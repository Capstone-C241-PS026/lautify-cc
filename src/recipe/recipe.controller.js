const express = require('express');
const router = express.Router();
const { getAllRecipe, getRecipeById, getRecipesByQuery, saveRecipe, getAllRecipeSaved, getSavedRecipeById, deleteSavedRecipe } = require('./recipe.service');

router.get('/', async (req, res) => {
  try {
    const recipes = await getAllRecipe()
    res.status(200).send(recipes)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const recipe = await getRecipeById(id)
    res.status(200).send(recipe)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})


router.get('/fish/search', async (req, res) => {
  try {
    const { query } = req.query
    const recipes = await getRecipesByQuery(query)
    res.status(200).send(recipes)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.post('/save/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const recipeData = req.body
    const response = await saveRecipe(uid, recipeData)
    res.status(201).send(response)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.get('/save/:uid', async (req, res) => {
  try {
    const { uid } = req.params
    const savedRecipes = await getAllRecipeSaved(uid)
    res.status(200).send(savedRecipes)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.get('/save/:uid/:rid', async (req, res) => {
  try {
    const { uid, rid } = req.params
    const recipe = await getSavedRecipeById(uid, rid)
    res.status(200).send(recipe)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.delete('/save/:uid/:rid', async (req, res) => {
  try {
    const { uid, rid } = req.params
    const response = await deleteSavedRecipe(uid, rid)
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})


module.exports = router