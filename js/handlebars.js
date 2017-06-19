// Moments.js Date Format
moment.updateLocale('de', {
    calendar : {
        lastDay : '[Gestern]',
        sameDay : '[Heute]',
        nextDay : '[Morgen]',
        lastWeek : '[letzten] dddd',
        nextWeek : 'dddd',
        sameElse : 'dddd, LL'
    }
});



// Date Format Helper
Handlebars.registerHelper ("formatDate", function(datetime) {
    if (moment) {
        return moment(datetime).calendar();
    }
    else {
        return datetime;
    }
});