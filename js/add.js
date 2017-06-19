"use strict";

// Pre-fill Date Field
document.getElementById("due-date").valueAsDate = new Date();

// Send Form
document.getElementById("addnew").addEventListener('click', function(e) {
    createNote();
});


// Add Item
function createNote() {

    let title = document.getElementById("title").value;
    if(title === null || title === '') {
        alert('Bitte einen Titel eintragen.');
    } else {

        let description = document.getElementById("description").value;
        let importance = document.getElementById("importance").value;
        let dueDate = document.getElementById("due-date").value;

        todoList.addNewTodo(title, description, importance, dueDate);
        window.location.replace("index.html");
    }
}