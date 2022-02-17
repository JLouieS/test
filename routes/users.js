//[SECTION] Dependencies and Modules
	const exp = require('express');
	const controller = require('../controllers/users');
	const auth = require('../auth');

//[SECTION] Routing Component
	const route = exp.Router();

//[SECTION] Routes [GET]
	//Register User
	route.post('/register', (req, res)=>{
		let userData = req.body;
		controller.registerUser(userData).then(outcome=>{
			res.status(201);
			res.send(outcome);
		});
	});
	//Login User
	route.post('/login',(req, res)=>{
		let data = req.body;
		controller.loginUser(data).then(result =>{
			res.send(result);
		})
	})

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
	route.put('/:userId/set-as-admin', auth.verify,(req,res)=>{
		let token = req.headers.authorization;
		let payload = auth.decode(token);
		let isAdmin = payload.isAdmin;
		let id = req.params.userId;
		isAdmin ? controller.setAsAdmin(id).then(result=>res.send(result))
		: res.send('Unauthorized User');
	});
	//Set as Non-Admin
	route.put('/:userId/set-as-user', auth.verify,(req, res)=>{
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		let id = req.params.userId;
		isAdmin ? controller.setAsNonAdmin(id).then(result=>res.send(result))
		: res.send('Unauthorized User');
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