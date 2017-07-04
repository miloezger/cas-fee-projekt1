;(function (services,$) {


    function addNewTodo(title, description, importance, dueDate) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            url: "/todos/",
            data: JSON.stringify({title, description, importance, dueDate}),
            error: function(result) {
                console.log(result);
            }
        });
    }


    function updateTodo(id, title, description, importance, dueDate, isCompleted) {
        const data = JSON.stringify({title, description, importance, dueDate, isCompleted});

        console.log(data);

        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            url: "/todos/" + id,
            data: data,
            error: function(result) {
                console.log(result);
            },
            success: function(result) {
                console.log(result);
            }
        });
    }


    function getAllTodos(sortBy) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "GET",
            url: "/todos/",
            data: {sortBy},
            error: function(result) {
                console.log(result);
            }
        });
    }


    function getTodo(id) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "GET",
            url: "/todos/" + id,
            data: undefined,
            error: function(result) {
                console.log(result);
            }
        });
    }


    function completeTodo(id, isCompleted) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "PUT",
            url: "/todos/" + id,
            data: JSON.stringify({isCompleted}),
            error: function(result) {
                console.log(result);
            }
        });
    }


    function deleteTodo(id) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            method: "POST",
            url: "/todos/delete/" + id,
            data: undefined,
            error: function(result) {
                console.log(result);
            },
            success: function(result) {
                console.log(result);
            }
        });
    }


    services.restClient = {
        addNewTodo : addNewTodo,
        getAllTodos : getAllTodos,
        getTodo : getTodo,
        completeTodo : completeTodo,
        deleteTodo : deleteTodo,
        updateTodo : updateTodo
    };

}(window.services = window.services || { }, jQuery));


