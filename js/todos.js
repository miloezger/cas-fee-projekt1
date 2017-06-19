"use strict";

// Module TodoElement
let todoList = (function () {

    // Blueprint
    class TodoListItem {
        constructor(title, description, importance, dueDate) {
            this.id = new Date().getTime();
            this.title = title;
            this.description = description;
            this.importance = importance;
            this.dueDate = dueDate;
            this.isCompleted = false;
        }
    }


    // Get all Notes
    function getAllTodos(sortBy = 'dueDate') {
        const todos = todoStorage.getStorage();
        if (sortBy === 'importance') {
            sortTodoByImportance(todos);
        } else if (sortBy === 'dueDate') {
            sortTodoByDate(todos);
        }
        return todos;
    }


    // Sort
    function sortTodoByImportance(todos) {
        todos.sort(function (a, b) {
            return b.importance - a.importance;
        });
    }
    function sortTodoByDate(todos) {
        todos.sort(function (a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }


    // Find by id
    function getTodoById(id) {
        let elements = todoStorage.getStorage();
        for ( let i = 0; i < elements.length; i++ ) {
            let obj = elements[i];
            if ( parseInt(obj.id) === parseInt(id) ) {
                return obj;
            }
        }
    }


    // Add new
    function addNewTodo(title, description, importance, dueDate) {
        // Create new Element
        let todoItem = new TodoListItem(title, description, importance, dueDate);
        // Get all Elements
        let elements = todoStorage.getStorage();
        // Add new Element
        elements.push(todoItem);
        // Save all Elements
        todoStorage.setStorage(elements);
    }


    // Edit
    function updateTodo(id, title, description, importance, dueDate, isCompleted) {

        let elements = todoStorage.getStorage();
        // Find Element
        for ( let i = 0; i < elements.length; i++ ) {
            let obj = elements[i];
            if ( parseInt(obj.id) === parseInt(id) ) {
                obj.title = title;
                obj.description = description;
                obj.importance = importance;
                obj.dueDate = dueDate;
                obj.isCompleted = isCompleted;
            }
        }
        todoStorage.setStorage(elements);
    }


    // Give Access
    return {
        addNewTodo: addNewTodo,
        updateTodo: updateTodo,
        getAllTodos: getAllTodos,
        getTodoById: getTodoById
    }


})();





// Module Storage
let todoStorage = (function () {

    // Get Storage
    function getStorage() {
        let data = JSON.parse(localStorage.getItem("todos"));
        if(!data) {
            let empty = [];
            localStorage.setItem("todos", JSON.stringify(empty));
        }
        return data;
    }


    // Set Storage
    function setStorage(data) {
        localStorage.setItem("todos", JSON.stringify(data));
    }


    // Give Access
    return {
        getStorage: getStorage,
        setStorage: setStorage
    }


})();