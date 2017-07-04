const store = require("../services/todoStorage.js");


module.exports.getTodos = function(req, res) {
    store.all(req, function (err, todos) {
        res.json(todos || {});
    });
};


module.exports.addTodo = function(req, res) {
    let todo = store.add(req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.isCompleted, function(err, todo) {
        res.json(todo);
    });
};


module.exports.updateTodo = function(req, res) {
    store.update(req.params.id, req.body.title, req.body.description, req.body.importance, req.body.dueDate, req.body.isCompleted, function(err, todo) {
        res.json(todo);
    });
};


module.exports.getTodo = function(req, res) {
    store.get(req.params.id, function(err, todo) {
        res.json(todo);
    });
};


module.exports.completeTodo =  function (req, res) {
    store.complete(req.params.id, req.body.isCompleted, function(err, todo) {
        res.json(todo);
    });
};


module.exports.deleteTodo =  function (req, res) {
    store.delete(req.params.id, function(err, numRemoved) {
        res.json(numRemoved);
    });
};