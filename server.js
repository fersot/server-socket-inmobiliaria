
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/feriaminera.tk/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/feriaminera.tk/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/feriaminera.tk/chain.pem', 'utf8');


var $express = require('express');
var $axios = require('axios');
var $path    = require('path');
var $app     = $express();
var $server  = require('http').createServer($app);
var $io      = require('socket.io').listen($server);
var $config  = {
    PORT:   1991,
    SERVER: "::"
};

$app.use('/static', $express.static(__dirname + '/public'));
$app.set('views', $path.join(__dirname, 'views'));

$app.use('/', require('./routes/server'));
$app.use('/', require('./routes/buzz'));

$io.on('connection', function ($socket) {
    $socket.emit('Display::server connection', {
        id:        $socket.id,
        connected: true
    });

    $socket.on('Display::server buzz_me', function (data) {
        $socket.emit(data.nsp, data.data);
    });

    $socket.on('Display::server buzz', function (data) {
        $socket.broadcast.emit(data.nsp, data.data);
    });

    $socket.on('disconnect', function () {
        console.log('Disconnect Display::server IO :(');
    });
});

$server.listen($config.PORT, $config.SERVER, function () {
    console.log('Display::server is running and listening to port %s:%d...', $config.SERVER, $config.PORT);
});