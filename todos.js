var express = require('express');
var router = express.Router();
var todoList = require('./todoList');

var idcount = 2;

// GET /api/todos
router.get('/', (req, res, next) => {
  res.json(todoList);
});

// GET /api/todos/:id
router.get('/:id', (req, res, next) => {
  // find todo item that has the same id as the req parameter
  let foundTodo = todoList.find((element) => element.id === parseInt(req.params.id));

  if(foundTodo !== undefined && foundTodo.length != 0) {
      res.json(foundTodo);
  } else {
      // send error for not found todo item with the given id.
      res.status(404).send('no todo item found with id: ' + req.params.id);
  }
});

// POST /api/todos
router.post('/', (req, res, next) => {
  if(!req.body.todo || req.body.todo == ''){
      // send error as we require todo items to have the todo key to create
      res.status(400).send('Please send a todo with a todo key');
      return;
  }

  //push the new todo to the todo list with the new id.
  todoList.push({todo: req.body.todo, id: ++idcount});
  res.json(todoList);
});

// PUT /api/todos/:id
router.put('/:id', (req, res, next) => {
  
  if(!req.body.todo || req.body.todo == ''){
      res.status(400).send('bad request it needs a todo key.');
      return;
  }
  // 1) find the todo item with the given id.
  let foundTodo = todoList.find((element) => element.id === parseInt(req.params.id));

  // 2) modify this todo item.
  foundTodo.todo = req.body.todo;
  
  // 3) return the newly modified todo item.
  res.json(foundTodo);
});

// DELETE /api/todos/:id
router.delete('/:id', (req, res, next) => {
  // 1) find the ones that are not the param id and replace current todo list
  todoList = todoList.filter((element) => element.id !== parseInt(req.params.id));

  // 3) send todo list after deletion.
  res.json(todoList);
});

module.exports = router;