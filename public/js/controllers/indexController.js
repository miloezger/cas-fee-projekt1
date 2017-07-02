"use strict";
(function(){

    const client = window.services.restClient;
    const source = document.getElementById("todo-template").innerHTML;
    const sourceCompleted = document.getElementById("completed-template").innerHTML;

    // Render List
    renderTodoList();

    // Sort
    const sortSelect = document.getElementById("sort-selection");
    sortSelect.addEventListener('change', function(e) {
        renderTodoList(this.value);
        // console.log(this.value);
    });


    // Render List Function
    function renderTodoList(sortBy = 'dueDate') {

        client.getAllTodos(sortBy).done(function(todos) {

            // Sort
            if (sortBy === 'importance') {
                todos.sort(function (a, b) {
                    return b.importance - a.importance;
                });
            } else if (sortBy === 'dueDate') {
                todos.sort(function (a, b) {
                    return new Date(b.dueDate) - new Date(a.dueDate);
                });
            }

            // Render
            let template = Handlebars.compile(source);
            document.getElementById("todo").innerHTML = template({todos : todos});

            // Render Completed
            let templateCompleted = Handlebars.compile(sourceCompleted);
            document.getElementById("completed").innerHTML = templateCompleted({todos : todos});

            // Update Button
            registerDeleteButton();
            registerCompleteButton();

        });

    }


    // Delete Button
    function registerDeleteButton() {
        let deleteButton = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteButton.length; i++) {

            deleteButton.item(i).addEventListener('click', function(e) {

                let currentId = this.parentNode.parentNode.id;
                console.log('delete ' + currentId);
                deleteItem(currentId);

            });
        }
    }
    // Delete Item
    function deleteItem(id) {
        client.deleteTodo(id);
        renderTodoList();
    }



    // Complete Button
    function registerCompleteButton() {
        let statusButtons = document.getElementsByClassName('status-button');
        for(let i = 0; i < statusButtons.length; i++) {

            statusButtons.item(i).addEventListener('click', function (e) {

                let currentId = this.parentNode.id;
                console.log('complete ' + currentId);

                client.getTodo(currentId).done(function(todo) {

                    completeItem(currentId, todo.isCompleted);

                });

            });
        }
    }

    // Complete Item
    function completeItem(id, status) {

        let newStatus = !status;
        console.log(newStatus);

        client.completeTodo(id, newStatus);
        renderTodoList();
    }


}());