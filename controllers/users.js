//[SECTION] Dependencies and Modules
	const User = require('../models/User');
	const bcrypt = require('bcrypt');

//[SECTION] Functionalities [Create]
	module.exports.registerUser = (data)=>{
		// let fName = data.firstName;
		// let lName = data.lastName;
		let email = data.email;
		let passW = data.password;

			let newUser = new User({
				// firstName: fName,
				// lastName: lName,
				email: email,
				password: bcrypt.hashSync(passW, 10),
			});

			return newUser.save().then((user, err)=>
			{
				if (user) {
					return user;
				} else {
					return false;
				}
			})
	};
	//Retrieve All Users
	module.exports.getAllUsers = ()=>{
		return User.find({}).then(resultQuery=>{
			return resultQuery;
		});
	};
