const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/html'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});


app.use("/todos", require('./routes/todoRoutes.js'));


app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});


const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {  console.log(`Server running at http://${hostname}:${port}/`); });