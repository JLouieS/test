//[SECTION] Dependencies and Modules
	const express = require('express');
	const controller = require('../controllers/orders');
	const auth = require('../auth');

//[SECTION] Routing Component
	const route = express.Router();

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
	
//[SECTION] Export
module.exports = route;