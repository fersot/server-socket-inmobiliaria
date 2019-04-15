var $express = require('express');
var $route   = $express.Router();

$route.get('/buzz', function ($req, $res) {
    $res.sendFile((__dirname).replace('routes', '') + '/views/buzz.html');
});

module.exports = $route;
