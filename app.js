/* Call and Use Express, Cookie Session and Parameters */

var express = require('express');
var cookieSession = require('cookie-session');

var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended: false});

var app = express(); // initialisation of express


/* Use Session */
app.use(session({secret: 'todoSecret'}))

/* If no todolist in actualy session, create one */

.use(function(req, res, next){
    if(typeof(req.session.todolist) == 'undefined'){
        req.session.todolist = [];
    }
    next();
})

/* Generate trafic of todolist */
app.get('/', function(req, res){
    res.setHeader('Content-Type', 'text/plain');

    res.render('index.ejs', {todolist: req.session.todolist}); // check for user session

})

// for add items in todolist
.post('/ajouter', urlEncodedParser , function(req, res){
    res.setHeader('Content-Type', 'text/plain');

    if(req.body.newtodo != ''){
        req.session.todolist.push(req.body.newtodo); // add items with .push
    }
    res.redirect('/');

})

// for delete items in todolist with id user
.get('/supprimer/:id', function(req, res){
    res.setHeader('Content-Type', 'text/plain');

    if(req.params.id != ''){
        req.session.todolist.splice(req.params.id, 1); // delete 1 item with .splice
    }
    res.redirect('/')

})

/* For ERROR 404 */
.use(function(req,res,next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404);
    res.redirect('/');
});

/* Listen port 80 */
app.listen(80);