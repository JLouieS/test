//[SECTION] Dependencies and Modules
	const mongoose = require('mongoose');

//[SECTION] Schema
	const userSchema = new mongoose.Schema({
		firstName: {
			type: String,
			required: [true, 'First Name is Required']
		},
		lastName: {
			type: String,
			required: [true, 'Last Name is Required']
		},
		middleName: {
			type: String,
			required: [true, 'Middle Name Name is Required']
		},
		mobileNo: {
			type: String,
			required: [true, 'Mobile Number is Required']
		},
		email: {
			type: String,
			required: [true, 'Email is Required']
		},
		password: {
			type: String,
			required: [true, 'Password is Required']
		},
		isAdmin: {
			type: Boolean,
			default: false
		},
		orders: [
			{
				productId: {
					type: String,
					required: [true, "Product Name is Required"]
				},
				quantity: {
					type: Number,
					required: [true, "Quantity is Required"]
				},
				purchasedOn: {
					type: Date,
					default: new Date()
				}
		}]
	});


//[SECTION] Model
	module.exports = mongoose.model('User', userSchema);