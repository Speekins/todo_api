const routes = (app) => {
  let todos = app.locals.todos

  //**todos routes **/
  app.route('/todos')
    .get((request, response) => {
      response.status(200).json(app.locals.todos)
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
          res.status(422).json({ error: "Body is missing.",  message: `Please make sure body includes "content" and "complete" parameters.` })
        } else {
          todo.id = Date.now()
          todo.created = today
          todos.push(todo)
          res.status(201).json(todo)
        }
      } catch (error) {
        res.status(500).json("Something went wrong")
      }
    })

  //**todos/id routes **/
  app.route('/todos/:id')
    .get((request, response) => {
      const id = parseInt(request.params.id)
      console.log("GET ID", id)
      console.log("APP.LOCALS.TODO", app.locals.todos)
      const foundTodo = app.locals.todos.find(idea => idea.id === id)
      if (!foundTodo) {
        return response.status(404).json({ message: `Sorry, no todo found with an id of ${id}` })
      }
      response.status(200).json(foundTodo)
    })

    .delete((request, response) => {
      const id = request.params.id
      const filteredTodo = app.locals.todos.filter(todo => String(todo.id) !== String(id))
      app.locals.todos = filteredTodo
      response.status(200).json(app.locals.todos)
    })

    .put((req, res) => {
      // const { id } = req.params
      const id = parseInt(req.params.id)
      const { content, date, destination } = req.body
      // const updatedTask = app.locals.todos.find(todo => todo.id == id)
      const updatedTask = app.locals.todos.find(todo => String(todo.id) == String(id))
      console.log("UPDATEDTASK", updatedTask)
      updatedTask.destination = destination
      updatedTask.date = date
      updatedTask.content = content
      return res.json(updatedTask)
    })
}

module.exports = routes