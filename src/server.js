const express = require('express')
const recipeController = require('./recipe/recipe.controller')
const userController = require('./user/user.controller')
const authController = require('./auth/auth.controller')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

app.get('/api', (req, res) => {
  res.send('Api ready')
})
app.use("/api/auth", authController)
app.use("/api/users", userController)
app.use("/api/recipes", recipeController);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})