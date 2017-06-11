'use strict';


/*
--------------------------
For Testing
--------------------------
*/
function reset() {
    localStorage.clear();
}



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
    // console.log(data);

    // Check Sort
    var sortSelect = document.getElementById("sort-selection");
    var sortValue = sortSelect.options[sortSelect.selectedIndex].value;
    // console.log(sortValue);

    // Sort by Importance
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

    // Moments.js Datum Formatierung
    moment.locale('de');
    var DateFormats = {
    	short: "dddd, ll"
	}

    // Datum Formatierung helper
    Handlebars.registerHelper ("formatDate", function(datetime, format) {
        if (moment) {
            format = DateFormats[format] || format;
            return moment(datetime).format(format);
        }
        else {
            return datetime;
        }
    });

    // Handelbars
	var source = $("#todo-template").html(); 
	var template = Handlebars.compile(source);
	$('#todo').html(template(data));

    var sourceCompleted = $("#completed-template").html();
    var templateCompleted = Handlebars.compile(sourceCompleted);
    $('#completed').html(templateCompleted(data));

	//console.log(data);


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

        if (objId == id) {
        	
        	if (!obj.completed) {
        		obj.completed = true;
        	} else {
        		obj.completed = false;
        	}

            break;
        }
    }

   	// console.log(JSON.stringify(data));
    localStorage.setItem('todos', JSON.stringify(data));
    showResults();
}



// Complete Button
var statusButtons = document.getElementsByClassName('status-button');
for(var i = 0; i < statusButtons.length; i++) {
	
	statusButtons.item(i).addEventListener('click', function(e){
		//console.log('edit');
		var parent = this.parentNode; 
		var parentId = parent.id;
		completeItem(parentId);
	});
}


/*
--------------------------
Delete item
--------------------------
*/

function deleteItem (id) {

	var data = get_todos();
	var id = id;

    for (var i = 0; i < data.todos.length; i++){

        var obj = data.todos[i];
        var objId = obj.id;

        if (objId == id) {

            data.todos.splice(i, 1);

            break;
        }

    }
    localStorage.setItem('todos', JSON.stringify(data));
    showResults();
}



// Delete Button
var deleteButton = document.getElementsByClassName('delete');
for(var i = 0; i < deleteButton.length; i++) {

    deleteButton.item(i).addEventListener('click', function(e){
    	deleteItem(this.parentNode.parentNode.id);
    });
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

	// update active state tab navigation
	navigation.querySelector('a.active').classList.remove('active');
	e.target.classList.add('active');

	// update the content
	content.querySelector('div.selected').classList.remove('selected');
	content.querySelector(queryVal).classList.add('selected');
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