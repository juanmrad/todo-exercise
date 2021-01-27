const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var todoList = [
    {
        id: 2,
        todo: "Implement a REST API With id 2"
    },
    {
        id: 1,
        todo: "Implement a REST API with id 1"
    }
];

var idcount = 2;

// GET /api/todos
app.get('/api/todos', (req, res, next) => {
    res.json(todoList);
});

// GET /api/todos/:id
app.get('/api/todos/:id', (req, res, next) => {
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
app.post('/api/todos', (req, res, next) => {
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
app.put('/api/todos/:id', (req, res, next) => {
    
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
app.delete('/api/todos/:id', (req, res, next) => {
    // 1) find the ones that are not the param id and replace current todo list
    todoList = todoList.filter((element) => element.id !== parseInt(req.params.id));

    // 3) send todo list after deletion.
    res.json(todoList);
});

app.listen(port, function(){
    console.log('Todo List API is now listening on port: ' + port);
})