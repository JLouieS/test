//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');
	const cors = require('cors');
	const userRoutes = require('./routes/users');
	const productRoutes = require('./routes/products');
	const orderRoutes = require('./routes/orders');

//[SECTION] Environment Variables
	dotenv.config()
	const credentials = process.env.MONGO_DB
	const port = process.env.PORT;

//[SECTION] Database Connection 
	mongoose.connect(credentials)	
	let db = mongoose.connection;

	db.once('open',()=>{
		console.log('Connected to MongoDB')
	});

//[SECTION] Server Setup 
	const app = express();
	app.use(express.json());

//[SECTION] Server Routes
	app.use('/users', userRoutes);
	app.use('/products', productRoutes);
	app.use('/orders', orderRoutes);

//[SECTION]
//[SECTION]
	app.listen(port, ()=>console.log(`You are now Tuning in Port ${port}`));
	app.get('/',(req,res)=>{
		res.send(`Project Deployed Successfully`);
	});