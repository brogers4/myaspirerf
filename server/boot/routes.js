module.exports = function(app) {
	var router = app.loopback.Router();
	
	router.get('/', function(req, res) {
		res.render('index', {
			loginFailed: false
		});
	});
	
	router.get('/dashboard', function(req, res) {
		res.render('dashboard');
	});
	
	router.get('/logout', function(req, res) {
		var AccessToken = app.models.AccessToken;
		var token = new AccessToken({id: req.query.access_token});
		token.destroy();
		res.redirect('/');
	});
	
	router.post('/dashboard', function(req, res) {
		var email = req.body.email;
		var password = req.body.password;
		//console.log("email: "+email+" password: "+password);
		app.models.User.login({
			email: email,
			password: password
		}, 'user', function(err, token) {
			// console.log(token);
			if(err) {
				console.log(err);
				res.render('index', {
					email: email,
					password: password,
					loginFailed: true
				});
			} else {
				token = token.toJSON();
				app.models.controller.find({where: {owner_id: token.user.id}}, function(err, controllers) {
					// console.log("Controllers: "+JSON.stringify(controllers));
					res.render('dashboard', {
						username: token.user.username,
						password: token.user.password,
						accessToken: token.id,
						user: token.user,
						controllers: controllers
					});
				});
			}
		});
	});
	
	app.use(router);
};