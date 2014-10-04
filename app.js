var express = require('express');
var swig  = require('swig');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var eventsIO = require('./lib/eventsIO');

var pub = __dirname + '/static';
app.use(express.static(pub));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var port = new SerialPort("/dev/tty.usbmodemfd131",
{
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

port.on('open', function(){
	console.log('Serial Open');
	port.on('data', function(line){
		try {
			var data = JSON.parse(line);
			eventsIO.parse(data);
		} catch (e) {
			console.error(e);
		}
	});
});

eventsIO.on('buttonpress', function (player) {
	io.emit('button', player);
});

eventsIO.on('analog', function (sensors) {
	io.emit('joystick', sensors);
});

app.get('/', function(req, res){
	res.render('index', {});
});

app.get('/score',function(req,res){
	res.render('score',{});
});

io.on('connection', function(socket){
	console.log('user connected');
	socket.on('score',function(score){
		console.log("Player 1: "+score[0]);
		console.log("Player 2: "+score[1]);
		io.emit("showScore",score);
	});
});

http.listen(3000);
