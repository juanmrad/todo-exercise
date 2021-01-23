const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos

// GET /api/todos/:id

// POST /api/todos

// PUT /api/todos/:id

// DELETE /api/todos/:id

app.listen(port, function(){
    console.log('Todo List API is now listening on port: ' + port);
})