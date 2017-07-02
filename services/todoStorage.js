const Datastore = require('nedb');
const db = new Datastore({ filename: './data/todos.db', autoload: true });


// Blueprint
class TodoListItem {
    constructor(title, description, importance, dueDate) {

        this.title = title;
        this.description = description;
        this.importance = importance;
        this.dueDate = dueDate;
        this.isCompleted = false;
    }
}


// Add new
function publicAddNewTodo(title, description, importance, dueDate, callback) {

    let todoItem = new TodoListItem(title, description, importance, dueDate);
    db.insert(todoItem, function(err, newDoc) {
        if(callback){
            callback(err, newDoc);
        }
    });
}


// Update
function publicUpdateTodo(id, title, description, importance, dueDate, isCompleted, callback) {

    db.update({ _id: id}, {$set: { title: title, description: description, importance: importance, dueDate: dueDate, isCompleted: isCompleted}}, {}, function (err, count) {
        publicGetTodoById(id, callback);
    });
}


// Get all
function publicGetAllTodos(sortBy, callback) {

    db.find({}).sort({ dueDate: -1 }).exec(function (err, todos) {
        callback(err, todos);
    });

}

// Get by ID
function publicGetTodoById(id, callback) {
    db.findOne({ _id: id }, function (err, doc) {
        callback(err, doc);
    });
}

// Change isCompleted
function publicChangeTodoStatus(id, status, callback) {
    db.update({ _id: id }, {$set: { isCompleted: status }}, {}, function (err, count) {
        publicGetTodoById(id, callback);
    });
}

// Delete
function publicDeleteTodo(id) {
    db.remove({ _id: id }, {}, function (err, numRemoved) {
        // numRemoved = 1
    });
}


module.exports = {
    add: publicAddNewTodo,
    update: publicUpdateTodo,
    all: publicGetAllTodos,
    get: publicGetTodoById,
    complete: publicChangeTodoStatus,
    delete: publicDeleteTodo
};