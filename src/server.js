const express = require('express')
const recipeController = require('./recipe/recipe.controller')
const userController = require('./user/user.controller')
const { verifyIdToken } = require('./middleware/auth')
const app = express()
const cors = require('cors')
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/api', verifyIdToken, (req, res) => {
  res.send('Api ready')
})
app.use("/api/users", verifyIdToken, userController)
app.use("/api/recipes", verifyIdToken, recipeController);

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})