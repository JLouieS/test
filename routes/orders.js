//[SECTION] Dependencies and Modules
	const express = require('express');
	const controller = require('../controllers/orders');
	const auth = require('../auth');

//[SECTION] Routing Component
	const route = express.Router();
//[SECTION] Routes [POST]
	//Create Order
	route.post('/', auth.verify, (req, res)=>{
		let token = req.headers.authorization;
		let payload = auth.decode(token);
		let userId = payload.id;
		let isAdmin = payload.isAdmin;

		let productId = req.body.productId;
		let orderQ = req.body.quantity;

		let data = {
			userId: userId,
			orderId: productId,
			quantity: orderQ
		};
		if (!isAdmin) {
			controller.createOrder(data).then(result=>{
				res.send(result);
			});
		} else {
			res.send('User not allowed to create an order!');
		};
	});
//[SECTION] Routes [GET]
	route.get('/', auth.verify, (req,res)=>{
		let userData = auth.decode(req.headers.authorization);
		let userId = userData.id;
		controller.getOrders(userId).then(outcome=>{
			res.send(outcome);
		});
	});
	route.get('/all', auth.verify, (req,res)=>{
		let userData = auth.decode(req.headers.authorization);
		let isAdmin = userData.isAdmin;
		isAdmin ? controller.getAllOrders().then(result=>res.send(result))
		: res.send('User Not Authorized!');
	});
	route.get('/checkout', auth.verify, (req, res)=>{
		let userData = auth.decode(req.headers.authorization);
		let userId = userData.id;
		controller.checkOutOrders(userId).then(outcome=>{
			res.send(outcome);
		});
	})

//[SECTION] Export
module.exports = route;