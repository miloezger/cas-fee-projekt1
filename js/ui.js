"use strict";

(function() {

    // Style Switch
    let body = document.getElementsByTagName("BODY")[0];
    let styleSwitchContainer = document.getElementsByClassName('header-buttons')[0];
    let styleSwitchToggle = styleSwitchContainer.querySelector('input[type=checkbox]');
    let storedStyle = JSON.parse(localStorage.getItem("style"));
    if(!storedStyle) {
        localStorage.setItem("style", JSON.stringify("light"));
    }

    styleSwitchToggle.onchange = function() {
        if(this.checked) {
            body.classList.add('dark');
            localStorage.setItem("style", JSON.stringify("dark"));
        } else {
            body.classList.remove('dark');
            localStorage.setItem("style", JSON.stringify("light"));
        }
    }
    if (storedStyle === 'dark') {
        body.classList.add('dark');
        styleSwitchToggle.checked = true;
    } else {
        body.classList.remove('dark');
        styleSwitchToggle.checked = false;
    }



    // Tab Navigation Update Content
    function switchTabContent(e, navigation, content) {
        // <a> #id
        let queryVal = 'div' + e.target.hash;
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
    let mainContentWrapper = document.getElementsByClassName('content')[0];
    let tabsNavigation = mainContentWrapper.querySelector('.tab-nav');
    let tabsContent = mainContentWrapper.querySelector('.main');

    // Listen to tab-nav click
    tabsNavigation.addEventListener('click', function(e){

        // if event.target is <a>
        if (e.target.tagName.toLowerCase() === 'a') {

            // Show Content
            switchTabContent(event, tabsNavigation, tabsContent);
        }
    });


}());