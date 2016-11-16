var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var find = require('./findByNameAndPrice.js');

//Listen on our specifed port or 3000
var port = process.env.PORT || 3000;

//TODO-public direcotry currently empty
app.use(express.static(__dirname + './public'));

//Template engine used and view directory
app.set('view engine', 'pug');
app.set('views', './views');

//TODO
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.render('main');
});

app.post('/api/products/search', function(req, res) {
    //var _body = req.body;
    //Why does this stop the call???
    find(req.body.name, req.body.price, function(err, itemList) {
        if (err) {
            console.log('error in app post');
            return console.log('error');
        }
        console.log('res object 0 id is: ' + itemList[0].id);
        res.send(itemList);
    });
});

//Listen on port number in var port
app.listen(port, function() {
    console.log('eBay Front test on port ' + port)
});

console.log('Hello');