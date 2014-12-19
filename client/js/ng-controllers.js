'use strict';

var app = angular.module('arf-app');
	
app.controller('LoginCtrl', ['$scope', 'User', '$location', function($scope, User, $location){
	console.log("In LoginCtrl");
	$scope.credentials = {
		email: "",
		password: ""
	};
	$scope.rememberMe = false;
	$scope.doLogin = function() {
		console.log("Logging in...");
		User.login({rememberMe: $scope.rememberMe}, $scope.credentials).$promise.then(function(results){
			console.log("Login results: "+JSON.stringify(results));
			window.location.href = "/dashboard";
		});
	}
}]);

app.controller('ControllerCtrl', ['$scope', 'Controller', 'User', function($scope, Controller, User) {
	$scope.controllers = [];
	
	function getControllers() {
		console.log("Getting controllers for USER ID: "+$scope.user.id);
		// console.log("== Expected number: "+myControllers.length);
		User.controllers({id: $scope.user.id}).$promise.then(function(results){
			console.log("== Results: "+JSON.stringify(results));
			$scope.controllers = results;
		});
	}
	
	User.getCurrent(function(value,res){
		console.log("User: "+JSON.stringify(value));
		$scope.user = value;
		getControllers();
	});
	
	$scope.commands = ["Hello World!","This is a test.","Conquer the world."];
	
	$scope.addController = function() {
		console.log("In addController...");
	};
	
	$scope.removeController = function(controller) {
		console.log("In removeController...");
	};
	
	$scope.addCommand = function() {
		console.log("In addCommand...");
		$scope.commands.push($scope.commandText);
		$scope.commandText = '';
	};
	
	$scope.blinkUp = function(controller) {
		console.log("Blinking up...");
		console.log("  >> Controller: "+controller.id);
		console.log("  >> Imp Agent: "+controller.agent);
		console.log("  >> Impee: "+controller.imp_id);
		console.log("  >> Owner ID: "+controller.owner_id);
		$.ajax({
			url: controller.agent+"/blinkup",
			type: 'post',
			data: {
				owner_id: controller.owner_id,
				controller_name: controller.name,
				controller_id: controller.id,
				imp_id: controller.imp_id
			},
			headers: {
				"ARF-User-ID": controller.owner_id
			},
			dataType: 'text',
			success: function(data) {
				console.log("Blinkup Response: "+data);
			}
		});
	}
	
	$scope.deleteController = function(controller) {
		console.log("Deleting controller...");
		// Controller.destroyById({id: controller.id, access_token: myToken}).$promise.then(function(err){
			// if(err) console.log("  >> Error deleting controller: "+JSON.stringify(err));
			// else console.log("  >> Successfully deleted controller.");
		// });
		Controller.deleteById({id: controller.id}).$promise.then(function() {
			getControllers();
		});
	};
	
	socket.on('rand', function(data){
		console.log("RAND: "+data.rand);
	});

	socket.on('controllerAfterSave',function(data){
		console.log("Received controllerAfterSave: "+JSON.stringify(data));
		getControllers();
	});
	
	// socket.on('controllerAfterUpdate',function(data){
		// console.log("Received controllerAfterUpdate: "+JSON.stringify(data));
	// });
	
}]);