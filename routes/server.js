var $express = require('express');
var $route   = $express.Router();

$route.get('/', function ($req, $res) {
    $res.sendFile((__dirname).replace('routes', '') + '/views/server.html');
});

module.exports = $route;
