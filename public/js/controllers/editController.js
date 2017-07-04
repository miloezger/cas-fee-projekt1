"use strict";
(function(){

    const rest = window.services.restClient;

    // Helper
    let currentId = window.location.hash.substr(1);
    let titleField = document.getElementById("title");
    let descriptionField = document.getElementById("description");
    let importanceField = document.getElementById("importance");
    let dueDateField = document.getElementById("due-date");
    let statusField = document.getElementById("status");

    rest.getTodo(currentId).done(function(todo) {

        // console.log(todo.isCompleted);
        // console.log(currentId);

        // Prefill Form
        titleField.value = todo.title;
        descriptionField.value = todo.description;
        importanceField.value = todo.importance;
        dueDateField.value = todo.dueDate;
        statusField.value = todo.isCompleted;

    });


    // Send Form
    document.getElementById("update").addEventListener('click', function(e) {
        updateNote();
    });


    // Update Entry
    function updateNote() {

        let title = document.getElementById("title").value;
        if(title === null || title === '') {
            alert('Bitte einen Titel eintragen.');
        } else {

            let description = document.getElementById("description").value;
            let importance = document.getElementById("importance").value;
            let dueDate = document.getElementById("due-date").value;
            let isCompleted = (document.getElementById("status").value === "true");

            rest.updateTodo(currentId, title, description, importance, dueDate, isCompleted);
            window.location.replace("index.html");

        }
    }


})();