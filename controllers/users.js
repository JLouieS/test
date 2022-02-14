//[SECTION] Dependencies and Modules
	const User = require('../models/User');
	const bcrypt = require('bcrypt');

//[SECTION] Functionalities [Create]
	//Register User
	module.exports.registerUser = (data)=>{
		let fName = data.firstName;
		let lName = data.lastName;
		let mName = data.middleName;
		let email = data.email;
		let passW = data.password;

			let newUser = new User({
				firstName: fName,
				lastName: lName,
				middleName: mName,
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
			});
	};
	//Retrieve All Users
	module.exports.getAllUsers = ()=>{
		return User.find({}).then(resultQuery=>{
			return resultQuery;
		});
	};
	//Retrieve Single User
	module.exports.getUser = (id) =>{
		return User.findById(id).then((foundUser, err)=>{
			
			if (foundUser) {
				foundUser.password = '';
				return foundUser;
			} else {
				return 'User Not Found';
			}
		});
	};
	//Set as Admin
	module.exports.setAsAdmin =(userId) =>{
		let updateUser = {
			isAdmin: true
		};
		return User.findByIdAndUpdate(userId, updateUser).then((admin, err)=>{
			if (admin) {
				return `${admin.firstName} has been set as Admin.`;
			} else {
				return "Failed to Set as Admin!";
			}
		});
	};
	//Check if Email Exists
	module.exports.checkEmailExists = (reqBody) =>{
		let doesExist = {
			email: reqBody.email
		}
		return User.find(doesExist).then((exist, err)=>{
			if (exist.length > 0) {
				return `Email already exists!`;
			} else {
				return `Email is still available!`;
			}
		});
	};
	module.exports.deleteUser =(id) =>{
		return User.findByIdAndRemove(id).then((deletedUser, err)=>{
			if (deletedUser) {
				return 'Account Deleted Successfully!';
			} else {
				return 'No Account were Removed!';
			}
		})
	}

