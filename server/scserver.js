// scserver.js
var SocketCluster = require('socketcluster').SocketCluster;

var socketCluster = new SocketCluster({
	balancers: 1,
	workers: 1,
	stores: 1,
	port: process.env.PORT || 8000,
	appName: 'arf-app',
	workerController: __dirname + '/worker.js',
	balancerController: __dirname + '/balancer.js',
	storeController: __dirname + '/store.js',
	addressSocketLimit: 0,
	socketChannelLimit: 100,
	rebootWorkerOnCrash: true
});