//[SECTION] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controllers/users');

//[SECTION] Routing Component
	const route = exp.Router();

//[SECTION] Routes [POST AND GET]
	//Register User
	route.post('/register', (req, res)=>{
		let userData = req.body;
		controller.registerUser(userData).then(outcome=>{
			res.status(201);
			res.send(outcome);
		});
	});
	//Retrieve All Users
	route.get('/',(req, res)=>{
		controller.getAllUsers().then(result=>{
			res.send(result);
		})
	});
	//Retrieve Single User
	route.get('/:details', (req, res)=>{
		let details = req.params.details
		controller.getUser(details).then(result=>{
			res.send(result);
		});
	});
//[SECTION] Routes [PUT]
	//Set as Admin
	route.put('/:userId/set-as-admin', (req,res)=>{
		let id = req.params.userId;
		controller.setAsAdmin(id).then(result=>{
			res.send(result);
		});
	});
//[SECTION] Routes [POST]
	//Email Checker
	route.post('/check-email', (req, res)=>{
		let email = req.body;
		controller.checkEmailExists(email).then(result=>{
			res.send(result);
		})
	});
//[SECTION] Routes [DELETE]
	route.delete('/:id', (req, res)=>{
		let id = req.params.id
		controller.deleteUser(id).then(result=>{
			res.send(result);
		});
	});

module.exports = route;