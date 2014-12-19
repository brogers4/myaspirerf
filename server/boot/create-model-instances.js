// create-model-instances.js

var debug = require('debug')('boot:create-model-instances');

module.exports = function(app) {
	var User = app.models.user;
	var Role = app.models.Role;
	var RoleMapping = app.models.RoleMapping;
	var Family = app.models.family;
	var Controller = app.models.controller;
	
	// User.find({where: {username: 'Brandon'}}, function(err, users) {
		// console.log("Creating Brandon's controller 2");
		// for(var i=0; i<users.length; i++){
			// users[i].controllers.create({
				// imp_id: '232e41b030728cee',
				// agent: 'https://agent.electricimp.com/ATFkDeFEQemj',
				// name: "Brandon's Controller 2"
			// });
		// }
	// });
	if(User.count({username: 'imp_agent'}) > 0) User.create({username: 'imp_agent', email: 'imp_agent@eaton.com', password: 'Eatoneaton!23'}, function(err, users) {
		if(err) return console.log("Err creating imp_agent: "+err);
		
		console.log("Success creating imp_agent.");
		// Create IMP_AGENT role
		Role.create({
			name: 'imp_agent'
		}, function(err, role) {
			if(err) return debug(err);
			debug(role);
			role.principals.create({
				principalType: RoleMapping.USER,
				principalId: users.id
			}, function(err, principal) {
			
			});
		});
	});
	
	User.create([
		{username: 'Brandon', email: 'brandonrogers@eaton.com', password: 'eatoneaton123'},
		{username: 'Austin', email: 'austineldridge@eaton.com', password: 'eatoneaton123'},
		{username: 'Max', email: 'maxmueller@eaton.com', password: 'eatoneaton123'}
	], function(err, users) {
		if (err) return debug('%j', err);
		debug(users);
		console.log("Users Brandon, Austin, and Max created.");
		// Add Controller 1 to Brandon
		users[0].controllers.create({
			imp_id: '232e41b030728cee',
			agent: 'https://agent.electricimp.com/ATFkDeFEQemj',
			name: "Brandon's Controller 1"
		}, function(err, controller) {
			if (err) return debug(err);
			console.log("Brandon's controller 1 created.");
		});
		// Add Controller 2 to Brandon
		users[0].controllers.create({
			imp_id: '232e41b030728cee',
			agent: 'https://agent.electricimp.com/ATFkDeFEQemj',
			name: "Brandon's Controller 2"
		}, function(err, controller) {
			if (err) return debug(err);
			console.log("Brandon's controller 2 created.");
		});
		// Add Controller to Austin
		users[1].controllers.create({
			imp_id: '232e41b030728cee',
			agent: 'https://agent.electricimp.com/ATFkDeFEQemj',
			name: "Austin's Controller"
		}, function(err, controller) {
			if (err) return debug(err);
			console.log("Austin's controller created.");
		});
		// Add Controller to Max
		users[2].controllers.create({
			imp_id: '232e41b030728cee',
			agent: 'https://agent.electricimp.com/ATFkDeFEQemj',
			name: "Max's Controller"
		}, function(err, controller) {
			if (err) return debug(err);
			console.log("Max's controller created.");
		});
		// Create ADMIN role
		Role.create({
			name: 'admin'
		}, function(err, role) {
			if(err) return debug(err);
			debug(role);
			role.principals.create({
				principalType: RoleMapping.USER,
				principalId: users[0].id
			}, function(err, principal) {
			
			});
		});
		// Create SUPER-ADMIN role
		// Role.create({
			// name: 'super-admin'
		// }, function(err, role) {
			// if(err) return debug(err);
			// debug(role);
			// role.principals.create({
				// principalType: RoleMapping.USER,
				// principalId: users[0].id
			// }, function(err, principal) {
			
			// });
		// });
	});
};