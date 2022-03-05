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
		let mobil = data.mobileNo;
		let email = data.email;
		let passW = data.password;

		return User.findOne({email: email}).then(result=>{
			if (result === null) {
			let newUser = new User({
				firstName: fName,
				lastName: lName,
				middleName: mName,
				mobileNo: mobil,
				email: email,
				password: bcrypt.hashSync(passW, 10)			
			});
				return newUser.save().then((user, err)=>
				{
					if (user) {
						return user;
					} else {
						return false;
					}
				});
			} else {
				return false;
			}
		});
	};
	//Login User
	module.exports.loginUser =(reqBody)=>{
		let uEmail = reqBody.email;
		let uPass = reqBody.password;
		return User.findOne({email: uEmail}).then(result=>{
			if (result === null) {
				return false;
			} else {
				let passW = result.password;
				const isMatched = bcrypt.compareSync(uPass, passW);
				if (isMatched) {
					let data = result.toObject();
					return {access: auth.createAccessToken(data)}
				} else {
					return false;
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
		return User.findById(id).then((result)=>{	
			return result;
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
				return true;
			} else {
				return false;
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
				return true; 
			} else {
				return false;
			};
		});
	};
	//Change Password
	module.exports.changePassword =(data)=>{
		let eMail = data.email;
		let oldPass = data.oldPassword;
		let newPass = data.newPassword;
		return User.findOne({email: eMail}).then(result=>{
			if (result === null) {
				return 'Email Does Not Exist';
			} else {
				let passWord = result.password;
				const isMatched = bcrypt.compareSync(oldPass, passWord);
				if (isMatched) {
					let newPassWord = {
						password: bcrypt.hashSync(newPass,10)
					}
					return User.findOneAndUpdate({email: eMail}, newPassWord).then((updated, err)=>{
						if (updated) {
							return 'Successfully Changed Password!';
						} else {
							return 'Failed to save New Password!';
						}
					})
				} else {
					return 'Password Mismatched! Check Again!';
				}
			}
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

