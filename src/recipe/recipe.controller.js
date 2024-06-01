const express = require('express');
const router = express.Router();
const { getAllRecipe, getRecipeById, getRecipesByQuery } = require('./recipe.service');

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


module.exports = router