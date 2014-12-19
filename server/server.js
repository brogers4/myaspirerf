var loopback = require('loopback');
var boot = require('loopback-boot');
// var WebSocketServer = require('ws').Server;
// var SocketCluster = require('socketcluster').SocketCluster;
//var sticky = require('sticky-session');

var app = module.exports = loopback();
// var io = require('socket.io');

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());

// -- Add your pre-processing middleware here --
var bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));

// boot scripts mount components like REST API
boot(app, __dirname);

// -- Mount static files here--
// All static middleware should be registered at the end, as all requests
// passing the static middleware are hitting the file system
// Example:
var path = require('path');
app.use(loopback.static(path.resolve(__dirname, '../client')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
app.set('json spaces', 2); // pretty print json responses

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
	app.server = app.start();

	// app.io = require('socket.io')(app.server);
  
  
  // app.io.on('connection', function(socket) {
	// console.log("a user connected");
	// var id = setInterval(function() {
		// app.io.emit(JSON.stringify(new Date()), {});
	// },1000);
	// socket.on('disconnect', function() {
		// console.log('a user disconnected');
		// clearInterval(id);
	// });
	// socket.on('command', function(cmd) {
		// console.log('Received command: '+JSON.stringify(cmd));
	// });
  // });
  
  // app.wss = new WebSocketServer({server: app.server});
  // app.wss.on('connection', function(ws){
	// var id = setInterval(function(){
		// ws.send(JSON.stringify(new Date()), function(){});
	// },1000);
	
	// console.log("websocket connection open");
	
	// ws.on("close", function() {
		// console.log("websocket connection close");
		// clearInterval(id);
	// });
	
	// ws.on("command", function(cmd) {
		// console.log("Received command: "+JSON.stringify(cmd));
	// });
  
  // });
}
