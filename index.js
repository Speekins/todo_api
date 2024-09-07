const express = require('express')
const todos = require('./data.js')
const cors = require('cors')
const app = express()
const routes = require('./server.js')
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: '*',  // For a more permissive CORS policy, allows requests from any domain
}))
app.use(express.json())

app.locals.title = 'Todos API'
app.locals.todos = todos

app.listen(PORT, () => {
  console.log(`${app.locals.title} is now running on ${PORT}`)
})

routes(app)