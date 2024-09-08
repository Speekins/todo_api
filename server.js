const routes = (app) => {
  let todos = app.locals.todos

  //**todos routes **/
  app.route('/todos')
    .get((req, res) => {
      res.status(200).json(todos)
    })

    // {
    //   id: 1,
    //   content: 'Return library books 📚',
    //   created: '2023-01-13',
    //   complete: true
    // }
    .post((req, res) => {
      let today = new Date().toISOString().slice(0, 10)
      try {
        const todo = req.body
        let keys = Object.keys(todo)
        if (!keys.includes("content") || !keys.includes("complete")) {
          res.status(422).json({ error: "Body is missing.", message: `Please make sure body includes "content" and "complete" parameters.` })
        } else {
          todo.id = Date.now()
          todo.created = today
          todos.push(todo)
          res.status(201).json(todo)
        }
      } catch (error) {
        res.status(500).send("Something went wrong")
      }
    })

  //**todos/id routes **/
  app.route('/todos/:id')
    .get((req, res) => {
      const id = parseInt(req.params.id)
      console.log("GET ID", id)
      console.log("APP.LOCALS.TODO", app.locals.todos)
      const foundTodo = app.locals.todos.find(idea => idea.id === id)
      if (!foundTodo) {
        return res.status(404).json({ message: `Sorry, no todo found with an id of ${id}` })
      }
      res.status(200).json(foundTodo)
    })

    .delete((req, res) => {
      const id = req.params.id
      const filteredTodo = app.locals.todos.filter(todo => String(todo.id) !== String(id))
      app.locals.todos = filteredTodo
      res.status(200).send('Task successfully deleted.')
    })

    .put((req, res) => {
      try {
        const { id } = req.params
        const taskToUpdate = todos.find(todo => todo.id === id)
        if (!taskToUpdate) {
          res.status(404).json({ error: "Provided ID not found", message: `Unable to find todo with the matching id of ${id}` })
        } else {
          for (let key in req.body) {
            taskToUpdate[key] = req.body[key]
          }
          res.status(200).json(taskToUpdate)
        }
      } catch (error) {
        res.status(500).send("Something went wrong")
      }
    })
}

module.exports = routes