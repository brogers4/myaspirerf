module.exports = function(User) {

	// REST API
	// GET /get-controllers
	User.getControllers = function(cb) {
		// TODO: Add functionality
		cb(null,"Getting Controllers");
		console.log("IN getControllers");
	};
	User.remoteMethod('getControllers', {
		returns: {arg: 'controllers', type: 'array'},
		http: {path: '/get-controllers', verb: 'get'}
	});

};
