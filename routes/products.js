//[SECTION] Dependencies and Modules
	const express = require('express');
	const controller = require('../controllers/products');
//[SECTION] Routing Component
	const route = express.Router();

//[SECTION] Routes [POST]
	//CREATE PRODUCT
	route.post('/create', (req, res) =>{
		let data = req.body;
		controller.createProduct(data).then(result=>{
			res.status(201);
			res.send(result);
		});
	});
//[SECTION] Routes [GET]
	//Retrieve All Products
	route.get('/all', (req, res)=>{
		controller.getAllProducts().then(result=>{
			res.send(result);
		});
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
	route.put('/:productId/archive', (req, res)=>{
		let id = req.params;
		controller.archiveProduct(id).then(result=>{
			res.send(result);
		});
	});
	//Update Product
	route.put('/:productId', (req, res)=>{
		let params = req.params;
		let body = req.body;
		controller.updateProduct(params, body).then(result=>{
			res.send(result);
		});
	});
//[SECTION] Routes [DELETE]
	//Delete Product
	route.delete('/:id', (req, res)=>{
		let id = req.params.id
		controller.deleteProduct(id).then(result=>{
			res.send(result);
		});
	});
//[SECTION] Export
	module.exports = route;