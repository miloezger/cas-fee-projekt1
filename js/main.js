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
    
    // Datum Formatierung
    moment.locale('de');

    // console.log(data.todos.length);

    // Remove Filter Bar when empty
    if(data.todos.length == 0) {
    	
    	var sortBarContainer = document.getElementsByClassName('content')[0];
    	var sortBarDomElement = sortBarContainer.querySelector('.filter-bar');
    	sortBarContainer.removeChild(sortBarDomElement);
    	
    }

    // Handelbars
	var source = $("#todo-template").html(); 
	var template = Handlebars.compile(source);
	$('#todo').html(template(data));


	console.log(data);

    // Show Results
    /*
    for (var i = 0; i < todos.length; i++){

        var obj = todos[i];
        var dueDateFormatted = moment(obj.dueDate).format('dddd, ll');
        
        if (obj.status == 'todo') {

	        html += '<h2>' + dueDateFormatted + '</h2>';

	        html += '<div id="' + obj.id + '" class="card">';

			html += '<div class="status-button">';

			// Complete Button
			html += '<button class="complete">';
			html += '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11"><polygon class="fill" points="13.281 .281 6 7.563 1.719 3.281 .281 4.719 5.281 9.719 6 10.406 6.719 9.719 14.719 1.719"/></svg>';
			html += '</button>';
			html += '</div>';
	        
			html += '<div class="card-content">';
			html += '<div class="summary">';
			html += '<h3>' + obj.title + '</h3>';
			html += '</div>';
			html += '<div class="description" style="display: none;">';
			html += '<p>' + obj.description + '</p>';
			html += '<p>' + obj.importance + '</p>';
			html += '</div>';
			html += '</div>';

			html += '<div class="action-button">';
			html += '<a href="add-note.html#' + obj.id + '" class="edit">';
			html += '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path class="fill" d="M22.90625,2.96875 C21.859286,2.96875 20.813178,3.3743215 20,4.1875 L4.40625,19.78125 L4.1875,20 L4.125,20.3125 L3.03125,25.8125 L2.71875,27.28125 L4.1875,26.96875 L9.6875,25.875 L10,25.8125 L10.21875,25.59375 L25.8125,10 C27.438857,8.373643 27.438857,5.813857 25.8125,4.1875 C24.999322,3.3743215 23.953214,2.96875 22.90625,2.96875 Z M22.90625,4.875 C23.409286,4.875 23.919428,5.1069285 24.40625,5.59375 C25.379893,6.567393 25.379893,7.620107 24.40625,8.59375 L23.6875,9.28125 L20.71875,6.3125 L21.40625,5.59375 C21.893072,5.1069285 22.403214,4.875 22.90625,4.875 Z M19.3125,7.71875 L22.28125,10.6875 L10.1875,22.78125 C9.533142,21.500659 8.4993415,20.466858 7.21875,19.8125 L19.3125,7.71875 Z M5.9375,21.4375 C7.1365842,21.923393 8.0766067,22.863416 8.5625,24.0625 L5.28125,24.71875 L5.9375,21.4375 Z"/></svg>';
			html += '</a>';
			html += '<a class="delete">';
			html += '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path class="fill" d="M12.59375,3 L12.28125,3.28125 L11.5625,4 L5,4 L5,6 L6,6 L6,24 C6,25.645455 7.3545455,27 9,27 L21,27 C22.645455,27 24,25.645455 24,24 L24,6 L25,6 L25,4 L18.4375,4 L17.71875,3.28125 L17.40625,3 L17,3 L13,3 L12.59375,3 Z M13.4375,5 L16.5625,5 L17.28125,5.71875 L17.59375,6 L18,6 L22,6 L22,24 C22,24.554545 21.554545,25 21,25 L9,25 C8.4454545,25 8,24.554545 8,24 L8,6 L12,6 L12.40625,6 L12.71875,5.71875 L13.4375,5 Z M10,10 L10,21 L12,21 L12,10 L10,10 Z M14,10 L14,21 L16,21 L16,10 L14,10 Z M18,10 L18,21 L20,21 L20,10 L18,10 Z"/></svg>';
			html += '</a>';
			html += '</div>';

			html += '</div>';

	        /*
	        // loop ing trough object
	        for (var key in obj){
	            var attrName = key;
	            var attrValue = obj[key];

	            //console.log(attrName);
	            // console.log(attrName + ": " + attrValue);
	            // document.getElementById("elements").innerHTML += "<p>" + attrName + ": " + attrValue + "</p>";
	            document.getElementById("elements").innerHTML += "<p>" + attrName + ": " + attrValue + "</p>";
	        }
	        */

	    /*
        } else {
        	
        	htmlCompleted += '<h2>' + dueDateFormatted + '</h2>';

	        htmlCompleted += '<div id="' + obj.id + '" class="card">';

			htmlCompleted += '<div class="status-button">';

			// Complete Button
			htmlCompleted += '<button class="complete">';
			htmlCompleted += '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="11" viewBox="0 0 15 11"><polygon class="fill" points="13.281 .281 6 7.563 1.719 3.281 .281 4.719 5.281 9.719 6 10.406 6.719 9.719 14.719 1.719"/></svg>';
			htmlCompleted += '</button>';
			htmlCompleted += '</div>';
	        
			htmlCompleted += '<div class="card-content">';
			htmlCompleted += '<div class="summary">';
			htmlCompleted += '<h3>' + obj.title + '</h3>';
			htmlCompleted += '</div>';
			htmlCompleted += '<div class="description" style="display: none;">';
			htmlCompleted += '<p>' + obj.description + '</p>';
			htmlCompleted += '<p>' + obj.importance + '</p>';
			htmlCompleted += '</div>';
			htmlCompleted += '</div>';

			htmlCompleted += '<div class="action-button">';
			htmlCompleted += '<a href="add-note.html#' + obj.id + '" class="edit">';
			htmlCompleted += '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path class="fill" d="M22.90625,2.96875 C21.859286,2.96875 20.813178,3.3743215 20,4.1875 L4.40625,19.78125 L4.1875,20 L4.125,20.3125 L3.03125,25.8125 L2.71875,27.28125 L4.1875,26.96875 L9.6875,25.875 L10,25.8125 L10.21875,25.59375 L25.8125,10 C27.438857,8.373643 27.438857,5.813857 25.8125,4.1875 C24.999322,3.3743215 23.953214,2.96875 22.90625,2.96875 Z M22.90625,4.875 C23.409286,4.875 23.919428,5.1069285 24.40625,5.59375 C25.379893,6.567393 25.379893,7.620107 24.40625,8.59375 L23.6875,9.28125 L20.71875,6.3125 L21.40625,5.59375 C21.893072,5.1069285 22.403214,4.875 22.90625,4.875 Z M19.3125,7.71875 L22.28125,10.6875 L10.1875,22.78125 C9.533142,21.500659 8.4993415,20.466858 7.21875,19.8125 L19.3125,7.71875 Z M5.9375,21.4375 C7.1365842,21.923393 8.0766067,22.863416 8.5625,24.0625 L5.28125,24.71875 L5.9375,21.4375 Z"/></svg>';
			htmlCompleted += '</a>';
			htmlCompleted += '<a class="delete">';
			htmlCompleted += '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30"><path class="fill" d="M12.59375,3 L12.28125,3.28125 L11.5625,4 L5,4 L5,6 L6,6 L6,24 C6,25.645455 7.3545455,27 9,27 L21,27 C22.645455,27 24,25.645455 24,24 L24,6 L25,6 L25,4 L18.4375,4 L17.71875,3.28125 L17.40625,3 L17,3 L13,3 L12.59375,3 Z M13.4375,5 L16.5625,5 L17.28125,5.71875 L17.59375,6 L18,6 L22,6 L22,24 C22,24.554545 21.554545,25 21,25 L9,25 C8.4454545,25 8,24.554545 8,24 L8,6 L12,6 L12.40625,6 L12.71875,5.71875 L13.4375,5 Z M10,10 L10,21 L12,21 L12,10 L10,10 Z M14,10 L14,21 L16,21 L16,10 L14,10 Z M18,10 L18,21 L20,21 L20,10 L18,10 Z"/></svg>';
			htmlCompleted += '</a>';
			htmlCompleted += '</div>';

			htmlCompleted += '</div>';

        }
    }
    document.getElementById("todo").innerHTML += html;
    document.getElementById("completed").innerHTML += htmlCompleted;
    */


} // End Function
















/*
--------------------------
Complete item
--------------------------
*/

function completeItem(id) {

	var data = get_todos();

	var id = id;
	// console.log(id);

	for (var i = 0; i < data.todos.length; i++){
        
        var obj = data.todos[i];
        var objId = obj.id;
        // console.log(objId);

        if (objId.toString() == id.toString()) {
        	
        	if (obj.status === 'todo') {
        		obj.status = 'completed';	
        	} else {
        		obj.status = 'todo';
        	}

        	break;
        	
        }

    }

    // console.log(todos);
    // console.log(JSON.stringify(todos));
   	console.log(JSON.stringify(data));
    localStorage.setItem('todos', JSON.stringify(data));

    showResults()
}


// Select all Complete-Buttons
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