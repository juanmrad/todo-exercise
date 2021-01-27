const express = require('express');
const app = express();
var todos = require('./todos');
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/todos', todos);

app.listen(port, function(){
    console.log('Todo List API is now listening on port: ' + port);
})