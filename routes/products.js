//[SECTION] Dependencies and Modules
	const express = require('express');
	const controller = require('../controllers/products');
	const auth = require('../auth');

//[SECTION] Routing Component
	const route = express.Router();

//[SECTION] Routes [POST]
	//CREATE PRODUCT
	route.post('/create', auth.verify,(req, res) =>{
		let isAdmin = auth.decode(req.headers.authorization).isAdmin;
		let data = req.body;
		isAdmin ? controller.createProduct(data).then(result=>res.send(result))
		: res.send('User Unauthorized to Proceed!');
	});
//[SECTION] Routes [GET]
	//Retrieve All Products
	route.get('/all', auth.verify,(req, res)=>{
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		isAdmin ?controller.getAllProducts().then(result=>res.send(result))
		: res.send('Unauthorized User!');
	});
	//RETRIEVE SINGLE PRODUCT
	route.get('/:id',(req, res)=>{
		let id = req.params.id;
		controller.getProduct(id).then(result=>{
			res.send(result);
		});
	});
	//Retrieve All Active Products
	route.get('/', (req, res)=>{
		controller.getAllActive().then(outcome=>{
			res.send(outcome);
		});
	});
//[SECTION] Routes [PUT]
	//Archived Product
	route.put('/:productId/archive', auth.verify,(req, res)=>{
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		let id = req.params;
		isAdmin ? controller.archiveProduct(id).then(result=>res.send(result))
		: res.send('User Unauthorized!');
	});
	//Update Product
	route.put('/:productId', auth.verify,(req, res)=>{
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		let params = req.params;
		let body = req.body;
		isAdmin ? controller.updateProduct(params, body).then(result=>res.send(result))
		: res.send('User Unauthorized!');
	});
//[SECTION] Routes [DELETE]
	//Delete Product
	route.delete('/:id', auth.verify,(req, res)=>{
		let token = req.headers.authorization;
		let isAdmin = auth.decode(token).isAdmin;
		let id = req.params.id;
		isAdmin ? controller.deleteProduct(id).then(result=>res.send(result))
		: res.send('User Unauthorized!');
	});
//[SECTION] Export
	module.exports = route;