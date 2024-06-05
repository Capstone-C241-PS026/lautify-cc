const express = require('express')
const recipeController = require('./recipe/recipe.controller')
const userController = require('./user/user.controller')
const { verifyIdToken } = require('./middleware/auth')
const app = express()
const port = 3000

app.use(express.json())

app.get('/api', verifyIdToken, (req, res) => {
  res.send('Api ready')
})

app.use("/api/users", userController)
app.use("/api/recipes", recipeController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})