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
		orders: [{
			products: [{
				productName: {
					type: String,
					required: [true, "Product Name is Required"]
				},
				quantity: {
					type: Number,
					required: [true, "Quantity is Required"]
						}
			}],
			total: {
				type: Number,
				required: [true, "Total Amount is Required!"]
			},
			purchasedOn: {
				type: Date,
				default: new Date()
			}
		}]
	});


//[SECTION] Model
	module.exports = mongoose.model('User', userSchema);