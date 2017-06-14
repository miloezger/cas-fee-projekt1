'use strict';



/*
--------------------------
Get Data from LocalStorage
--------------------------
*/

function get_todos() {

    var todos = localStorage.getItem("todos");

    if( !todos )
    {
        localStorage.setItem("todos", JSON.stringify({ todos: [] }));
        todos = localStorage.getItem("todos");
    }
    todos = JSON.parse(todos);

    return todos;
}
showResults();





/*
--------------------------
Show all Results
--------------------------
*/

function showResults() {

    var data = get_todos();

    // Check Sort Value
    var sortSelect = document.getElementById("sort-selection");
    var sortValue = sortSelect.options[sortSelect.selectedIndex].value;

    // Sort
    data.todos.sort(function(a, b) {

        if (sortValue === 'importance') {
            return a.importance - b.importance;
        } else {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }

    });

    // Remove Filter Bar when empty
    if(data.todos.length === 0) {

    	var sortBarContainer = document.getElementsByClassName('content')[0];
    	var sortBarDomElement = sortBarContainer.querySelector('.filter-bar');
    	sortBarContainer.removeChild(sortBarDomElement);

    }

    // Moments.js Date Format
    moment.locale('de');
    var DateFormats = {
    	short: "dddd, ll"
	};

    // Date Format Helper
    Handlebars.registerHelper ("formatDate", function(datetime, format) {
        if (moment) {
            format = DateFormats[format] || format;
            return moment(datetime).format(format);
        }
        else {
            return datetime;
        }
    });

    // Handelbars Tasks
    var source = document.getElementById("todo-template").innerHTML;
    var template = Handlebars.compile(source);
    document.getElementById("todo").innerHTML = template(data);

    // Handelbars Completed Tasks
    var sourceCompleted = document.getElementById("completed-template").innerHTML;
    var templateCompleted = Handlebars.compile(sourceCompleted);
    document.getElementById("completed").innerHTML = templateCompleted(data);

    // Add EventListener
    registerCompleteButton();
    registerDeleteButton();

}





/*
--------------------------
Complete item
--------------------------
*/

function completeItem(id) {

	var data = get_todos();
	var id = id;

	for (var i = 0; i < data.todos.length; i++){
        
        var obj = data.todos[i];
        var objId = obj.id;

        if ( parseInt(objId) === parseInt(id) ) {
        	
        	if (!obj.completed) {
        		obj.completed = true;
        	} else {
        		obj.completed = false;
        	}

            // TODO: write date log to completed items
        	console.log(new Date());

            break;
        }
    }

   	// console.log(JSON.stringify(data));
    localStorage.setItem('todos', JSON.stringify(data));
    showResults();
}

// Complete Button
function registerCompleteButton() {

    var statusButtons = document.getElementsByClassName('status-button');
    for(var i = 0; i < statusButtons.length; i++) {

        statusButtons.item(i).addEventListener('click', function(e){
            var parent = this.parentNode;
            var parentId = parent.id;
            completeItem(parentId);
        });
    }

}





/*
--------------------------
Delete item
--------------------------
*/

function deleteItem(id) {

	var data = get_todos();
	var id = id;

    for (var i = 0; i < data.todos.length; i++){

        var obj = data.todos[i];
        var objId = obj.id;

        if (parseInt(objId) === parseInt(id)) {

            data.todos.splice(i, 1);

            break;
        }

    }
    localStorage.setItem('todos', JSON.stringify(data));
    showResults();
}


// Delete Button
function registerDeleteButton() {

    var deleteButton = document.getElementsByClassName('delete');
    for (var i = 0; i < deleteButton.length; i++) {

        deleteButton.item(i).addEventListener('click', function(e) {
            deleteItem(this.parentNode.parentNode.id);
        });
    }

}





/* 	
--------------------------
Tab Navigation
--------------------------
*/

// Tab Navigation Update Content
function switchTabContent(e, navigation, content) {
	
	// <a> #id
	var queryVal = 'div' + e.target.hash;
	// dont show # in url
	e.preventDefault();

    if( !e.target.classList.contains('active') ) {

        // update active state tab navigation
        navigation.querySelector('a.active').classList.remove('active');
        e.target.classList.add('active');

        // update the content
        content.querySelector('div.selected').classList.remove('selected');
        content.querySelector(queryVal).classList.add('selected');
    }

}


// Tab Navigation
var mainContentWrapper = document.getElementsByClassName('content')[0];
var tabsNavigation = mainContentWrapper.querySelector('.tab-nav');
var tabsContent = mainContentWrapper.querySelector('.main');

// Listen to tab-nav click
tabsNavigation.addEventListener('click', function(e){

	// if event.target is <a>
	if (e.target.tagName.toLowerCase() === 'a') {
		
		// Show Content
		switchTabContent(event, tabsNavigation, tabsContent);
	}
});





/* 	
--------------------------
Style Switch
--------------------------
*/

var body = document.getElementsByTagName("BODY")[0];
var styleSwitchContainer = document.getElementsByClassName('header-buttons')[0];
var styleSwitchToggle = styleSwitchContainer.querySelector('input[type=checkbox]');

styleSwitchToggle.onchange = function() {
if(this.checked) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
}