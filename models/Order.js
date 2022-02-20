//[SECTION] Dependencies and Modules
	const mongoose = require('mongoose');

//[SECTION] Schema
	const orderSchema = new mongoose.Schema({
		userId: {
			type: String,
			required: [true, 'User ID is Required']
		},
		productId:{
			type: String,
			required:[true, "Product ID is Required"]
		},
		productName:{
			type: String,
			required: [true, "Product Name is Required"]
		},
		quantity: {
			type: Number,
			required: [true, 'Quantity is Required']
		},
		totalAmount: {
			type: Number,
			required: [true, 'Total Amount is Required']
		},
		purchasedOn: {
			type: Date,
			default: new Date()
		}
		
	});

//[SECTION] Model
	module.exports = mongoose.model('Order', orderSchema);