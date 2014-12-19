// worker.js

module.exports.run = function(worker) {
	console.log('   >> Worker PID:', process.pid);
	var scServer = worker.getSCServer();
	
	var activeSessions = {};

	var count = 0;

	/*
	In here we handle our incoming realtime connections and listen for events.
	From here onwards is just like Socket.io but with some additional features.
	*/
	scServer.on('connection', function (socket) {
		/*
		  Store that socket's session for later use.
		  We will emit events on it later - Those events will 
		  affect all sockets which belong to that session.
		*/
		console.log("Connection on SocketCluster");
		activeSessions[socket.session.id] = socket.session;

		socket.on('ping', function (data) {
			count++;
			console.log('PING', data);
			scServer.global.publish('pong', count);
		});
	});

	scServer.on('sessionEnd', function (ssid) {
		delete activeSessions[ssid];
	});

	setInterval(function () {
		/*
		  Emit a 'rand' event on each active session.
		  Note that in this case the random number emitted will be the same across all sockets which
		  belong to the same session (I.e. All open tabs within the same browser).
		*/
		for (var i in activeSessions) {
		  activeSessions[i].emit('rand', {rand: Math.floor(Math.random() * 100)});
		}
	}, 1000);
  
};