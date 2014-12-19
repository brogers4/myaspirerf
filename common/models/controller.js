module.exports = function(Controller) {
	// CONTROLLER HOOKS
	Controller.afterSave = function(next) {
		console.log("In controllerAfterSave");
		//Controller.app.io.emit("controllerAfterSave",this);
		next();
	};
	
	Controller.afterUpdate = function(next) {
		console.log("In controllerAfterUpdate");
		//Controller.app.io.emit("controllerAfterUpdate",this);
		next();
	};

	// REST API
	// GET /get-commands
	Controller.getCommands = function(cb) {
		// TODO: Add functionality
		cb(null,"Getting Commands");
		console.log("IN getCommands");
	};
	Controller.remoteMethod('getCommands', {
		returns: {arg: 'commands', type: 'array'},
		http: {path: '/get-commands', verb: 'get'}
	});
	
	// POST /push-command
	Controller.pushCommand = function(cmd, priority, cb) {
		// TODO: Add functionality
		console.log("IN pushCommand");
	};
	Controller.remoteMethod('pushCommand', {
		accepts: [
			{arg: 'cmd', type: 'string'},
			{arg: 'priority', type: 'number'}
		],
		returns: {arg: 'success', type: 'boolean'},
		http: {path: '/push-command', verb: 'post'}
	});
	
	// GET /pull-command
	Controller.pullCommand = function(cb) {
		// TODO: Add functionality
		console.log("IN pullCommand");
	};
	Controller.remoteMethod('pullCommand', {
		returns: {arg: 'cmd', type: 'string'},
		http: {path: '/pull-command', verb: 'get'}
	});
};
