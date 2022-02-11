//[SECTION] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controllers/users');

//[SECTION] Routing Component
	const route = exp.Router();

//[SECTION] Routes [POST]
	//Register User
	route.post('/register', (req, res)=>{
		let userData = req.body;
		controller.registerUser(userData).then(outcome=>{
			res.send(outcome);
		});
	});
	//Retrieve All Users
	route.get('/',(req, res)=>{
		controller.getAllUsers().then(result=>{
			res.send(result);
		})
	});


	module.exports = route;