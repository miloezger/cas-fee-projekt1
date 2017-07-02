"use strict";

(function() {

    // Helper
    let currentId = window.location.hash.substr(1);
    let titleField = document.getElementById("title");
    let descriptionField = document.getElementById("description");
    let importanceField = document.getElementById("importance");
    let dueDateField = document.getElementById("due-date");
    let obj = todoList.getTodoById(currentId);

    prefillForm();

    // Send Form
    document.getElementById("update").addEventListener('click', function(e) {
        updateNote();
    });

    // Pre Fill Form
    function prefillForm() {
        titleField.value = obj.title;
        descriptionField.value = obj.description;
        importanceField.value = obj.importance;
        dueDateField.value = obj.dueDate;
    }

    // Update Entry
    function updateNote() {
        todoList.updateTodo(currentId, titleField.value, descriptionField.value, importanceField.value, dueDateField.value, obj.isCompleted);
        window.location.replace("index.html");
    }


}());