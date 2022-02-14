//[SECTION] Dependencies and Modules
	const express = require('express');
	const controller = require('../controllers/products');
//[SECTION] Routing Component
	const route = express.Router();

//[SECTION] Routes
	//CREATE PRODUCT
	route.post('/create', (req, res) =>{
		let data = req.body;
		controller.createProduct(data).then(result=>{
			res.status(201);
			res.send(result);
		});
	});
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
	//[SECTION] Routes [DELETE]
	route.delete('/:id', (req, res)=>{
		let id = req.params.id
		controller.deleteProduct(id).then(result=>{
			res.send(result);
		});
	});


//[SECTION] Export
	module.exports = route;