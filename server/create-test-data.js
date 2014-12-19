// create-test-data.js
var server = require('./server');
var dataSource = server.dataSources.mongodb_dev;
var Controller = server.models.controller;
var controllers = [
	{ agent: 'test_agent',
	  imp_id: 'test_imp_id',
	  name: 'test_controller' },
	{ agent: 'test_agent_2',
	  imp_id: 'test_imp_id_2',
	  name: 'test_controller_2' }
	];
	
var count = controllers.length;
dataSource.automigrate('controller', function(err) {
	if(err) throw err;
	controllers.forEach(function(controller) {
		Controller.create(controller, function(err, result) {
			if(err) return;
			console.log("Record created: ", result);
			count--;
			if(count === 0) {
				console.log('done');
				dataSource.disconnect();
			}
		});
	});
});