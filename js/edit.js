
/*
--------------------------
Edit
--------------------------
*/


// Get the local storage
function get_todos() {
    var todos = localStorage.getItem("todos");
    todos = JSON.parse(todos);
    return todos;
}


// Fill out the form
if(window.location.hash) {

    var data = get_todos();
    var editId = window.location.hash.substr(1);
    // console.log(editId);

    for (var i = 0; i < data.todos.length; i++){

        var obj = data.todos[i];

        if ( parseInt(obj.id) === parseInt(editId) ) {

            // Pre-fill Fields
            document.getElementById("title").value = obj.title;
            document.getElementById("description").value = obj.description;
            document.getElementById("importance").value = obj.importance;
            document.getElementById("due-date").value = obj.dueDate;

        }
    }

}




/*
 --------------------------
 Update Entry
 --------------------------
 */
function update() {

    var data = get_todos();
    var editId = window.location.hash.substr(1);

    for (var i = 0; i < data.todos.length; i++){

        var obj = data.todos[i];

        if ( parseInt(obj.id) === parseInt(editId) ) {

            obj.title = document.getElementById("title").value;
            obj.description = document.getElementById("description").value;
            obj.importance = document.getElementById("importance").value;
            obj.dueDate = document.getElementById("due-date").value;

            break;

        }
    }

    localStorage.setItem('todos', JSON.stringify(data));
    window.location.replace("index.html");

}
