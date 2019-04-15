var fs = require( 'fs' );
var app = require('express')();
var https        = require('https');
var server = https.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/inmoso.tk/privkey.pem', 'utf8'),
	cert: fs.readFileSync('/etc/letsencrypt/live/inmoso.tk/cert.pem', 'utf8'),
	ca: fs.readFileSync('/etc/letsencrypt/live/inmoso.tk/chain.pem', 'utf8'),
	requestCert: false,
	rejectUnauthorized: false
},app);
server.listen(8080,function () {
	console.log('InmobiliariaSocket::server is running and listening to port %d...', 8080);
});

var io = require('socket.io').listen(server);

io.sockets.on('connection',function ($socket) {
	$socket.emit('InmobiliariaSocket::server connection', {
		id:        $socket.id,
		connected: true
	});

	$socket.on('InmobiliariaSocket::server buzz_me', function (data) {
		$socket.emit(data.nsp, data.data);
	});

	$socket.on('InmobiliariaSocket::server buzz', function (data) {
		$socket.broadcast.emit(data.nsp, data.data);
	});

	$socket.on('disconnect', function () {
		console.log('Disconnect InmobiliariaSocket::server IO :(');
	});
});

app.use('/static', require('express').static(__dirname + '/public'));
app.set('views', require('path').join(__dirname, 'views'));

app.use('/', require('./routes/server'));
app.use('/', require('./routes/buzz'));