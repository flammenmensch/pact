"use strict";

var request = require('request');
var bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.route('/api/proxy')
    .get(
        function(req, res) {
            request(req.query.url).pipe(res);
        }
    );

app.listen(process.env.PORT || 3000, function() {
    console.log('Server is up and running');
});