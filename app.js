
/* Call and Use : Express, Cookie Session, Parameters */

var express = require('express');
var session = require('cookie-session');

var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express(); // initialisation of express


/* Use Session */
app.use(session({secret: 'todotopsecret'}))

/* use directory public for other file like css or js */
.use(express.static(__dirname + '/public'))

/* If no todolist in actualy session, create one */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* Generate trafic of todolist */
.get('/', function(req, res) { 
    res.render('index.ejs', {todolist: req.session.todolist}); // check for user session
})

// for add items in todolist
.post('/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo); // add items with .push
    }
    res.redirect('/todo');
})

// for delete items in todolist with id user
.get('/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1); // delete selected item with .splice
    }
    res.redirect('/todo');
})

/* For ERROR 404 */
.use(function(req, res, next){
    res.redirect('/');
})

/* Listen port 80 */
.listen(80);