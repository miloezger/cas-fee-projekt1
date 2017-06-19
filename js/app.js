"use strict";

(function() {

    // Render List
    renderTodoList();


    // Sort
    let sortSelect = document.getElementById("sort-selection");
    sortSelect.addEventListener('change', function(e) {
        console.log(this.value);

        renderTodoList(this.value);
    });


    // Render List Function
    function renderTodoList() {

        let data = todoList.getAllTodos();

        // todoTemplate.renderToTemplate(template, data);
        // Handelbars Tasks
        let source = document.getElementById("todo-template").innerHTML;
        let template = Handlebars.compile(source);
        document.getElementById("todo").innerHTML = template(data);

        // Handelbars Completed Tasks
        let sourceCompleted = document.getElementById("completed-template").innerHTML;
        let templateCompleted = Handlebars.compile(sourceCompleted);
        document.getElementById("completed").innerHTML = templateCompleted(data);

        console.log(data);

        // Register Buttons
        registerCompleteButton();
        registerDeleteButton();
    }


    // Delete Button
    function registerDeleteButton() {
        let deleteButton = document.getElementsByClassName('delete');
        for (let i = 0; i < deleteButton.length; i++) {
            deleteButton.item(i).addEventListener('click', function(e) {
                deleteItem(this.parentNode.parentNode.id);
            });
        }
    }

    // Delete Item
    function deleteItem(id) {
        let allObj = todoList.getAllTodos();
        for ( let i = 0; i < allObj.length; i++ ) {
            let obj = allObj[i];
            if ( parseInt(obj.id) === parseInt(id) ) {
                allObj.splice(i, 1);
                break;
            }
        }
        // console.log(allObj);
        todoStorage.setStorage(allObj);
        renderTodoList();
    }



    // Complete Button
    function registerCompleteButton() {

        let statusButtons = document.getElementsByClassName('status-button');
        for(let i = 0; i < statusButtons.length; i++) {
            statusButtons.item(i).addEventListener('click', function (e) {
                completeItem(this.parentNode.id);
            });
        }
    }

    // Complete Item
    function completeItem(id) {
        let obj = todoList.getTodoById(id);
        if (!obj.isCompleted) {
            obj.isCompleted = true;
        } else {
            obj.isCompleted = false;
        }
        todoList.updateTodo(id, obj.title, obj.description, obj.importance, obj.dueDate, obj.isCompleted);
        renderTodoList();
    }


})();