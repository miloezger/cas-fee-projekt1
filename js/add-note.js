'use strict';


/*
 --------------------------
 Form Date Field
 --------------------------
 */

// Pre-fill Date Field
document.getElementById('due-date').valueAsDate = new Date();





/*  
--------------------------
Send new Todos to index.html
--------------------------
*/
function send() {

    var title = document.getElementById("title").value;
    if(title === null || title === '') {
        alert('Bitte einen Titel eintragen.');
    } else {

        var data = JSON.parse(localStorage.getItem("todos")) || { todos: [] };
        var id = new Date().getTime();

        var item = {
            id: id,
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            importance: parseInt(document.getElementById("importance").value),
            dueDate: document.getElementById("due-date").value,
            completed: false
        };

        data.todos.push(item);

        localStorage.setItem("todos", JSON.stringify(data));

        // console.log(todos);
        window.location.replace("index.html");

    }

}