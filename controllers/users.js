//[SECTION] Dependencies and Modules
	const User = require('../models/User');
	const Product = require('../models/Product');
	const bcrypt = require('bcrypt');
	const auth = require('../auth');
	const Order = require('../models/Order');

//[SECTION] Functionalities [Create]
	//Register User
	module.exports.registerUser = (data)=>{
		let fName = data.firstName;
		let lName = data.lastName;
		let mName = data.middleName;
		let email = data.email;
		let passW = data.password;

		return User.findOne({email: email}).then(result=>{
			if (result === null) {
			let newUser = new User({
				firstName: fName,
				lastName: lName,
				middleName: mName,
				email: email,
				password: bcrypt.hashSync(passW, 10)			
			});
				return newUser.save().then((user, err)=>
				{
					if (user) {
						return `Successfully Registered!`;
					} else {
						return false;
					}
				});
			} else {
				return 'Email Already Used!'
			}
		});
	};
	//Login User
	module.exports.loginUser =(reqBody)=>{
		let uEmail = reqBody.email;
		let uPass = reqBody.password;
		return User.findOne({email: uEmail}).then(result=>{
			if (result === null) {
				return 'Email does not Exist!';
			} else {
				let passW = result.password;
				const isMatched = bcrypt.compareSync(uPass, passW);
				if (isMatched) {
					let data = result.toObject();
					return {access: auth.createAccessToken(data)}
				} else {
					return 'Passwords Does Not Match. Check Credentials!';
				}
			};
		});
	};
//[SECTION] Functionalities [Retrieve]
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
//[SECTION] Functionalities [UPDATE]
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
	//Set as Non-Admin
	module.exports.setAsNonAdmin = (userId) =>{
		let updateUser = {
			isAdmin: false
		}
		return User.findByIdAndUpdate(userId, updateUser).then((user, err)=>{
			if (user) {
				return `${user.firstName} has been set back to a Regular User.`; 
			} else {
				return 'Failed to Update User';
			};
		});
	};
//[SECTION] Functionalities [DELETE]
	//Delete User
	module.exports.deleteUser =(id) =>{
		return User.findByIdAndRemove(id).then((deletedUser, err)=>{
			if (deletedUser) {
				return 'Account Deleted Successfully!';
			} else {
				return 'No Account were Removed!';
			}
		});
	};

