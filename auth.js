//[SECTION] Dependencies and Modules
	const jwt = require('jsonwebtoken');
	const dotenv = require('dotenv');

//[SECTION] Environment Variables Setup
	dotenv.config();
	let secret = process.env.SECRET;

//[SECTION] Functionalities
	module.exports.createAccessToken = (authUser) =>{
		const userData = {
			id: authUser._id,
			email: authUser.email,
			isAdmin: authUser.isAdmin
		};
		return jwt.sign(userData, secret, {});
	};