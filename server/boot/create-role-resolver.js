// create-role-resolver.js
var debug = require('debug')('boot:create-role-resolver');

module.exports = function(app) {
	var Role = app.models.Role;
	Role.registerResolver('owner_agent', function(role, context, cb) {
		function reject() {
			//console.log("Rejecting owner_agent role");
			process.nextTick(function() {
				cb(null,false);
			});
		}
		if(context.modelName !== 'controller') {
			// Do not allow targets that are not controller
			return reject();
		}
		var userId = context.accessToken.userId;
		if(!userId) {
			// Do not allow anonymous users
			return reject();
		}
		// Check if agent user_id is same as controller owner_id
		context.model.findById(context.modelId, function(err, controller) {
			if(err || !controller){
				return reject();
			}
			var Agent = app.models.Agent;
			Agent.findById(userId, function(err, agent) {
				if(err || !agent){
					return reject();
				}
				if(agent.user_id == controller.owner_id) {
					//console.log("Accepting owner_agent role");
					cb(null,true);
				}
			});
		});
	});
	
	Role.registerResolver('familyMember', function(role, context, cb) {
		function reject() {
			console.log("Rejecting role");
			process.nextTick(function() {
				cb(null,false);
			});
		}
		// TODO: Validate if role appropriate
		console.log("Approving role");
		cb(null,true);
	});
};