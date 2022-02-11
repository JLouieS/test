//[SECTION] Dependencies and Modules
	const express = require('express');
	const mongoose = require('mongoose');
	const dotenv = require('dotenv');

//[SECTION] Environment Variables
	dotenv.config()
	const credentials = process.env.MONGO_DB
	const port = process.env.PORT;

//[SECTION] Database Connection 
	mongoose.connect(credentials)
// Just to test the connection	
	let db = mongoose.connection;

	db.once('open',()=>{
		console.log('Connected to MongoDB')
	});

//[SECTION] Routing Components

//[SECTION] Server Setup 
	const app = express();
	app.use(express.json());

//[SECTION]
//[SECTION]
	app.listen(port, ()=>console.log(`You are now Tuning in Port ${port}`));
