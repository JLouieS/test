//[SECTION] Dependencies and Modules
	const mongoose = require('mongoose');

//[SECTION] Schema
	const productSchema = new mongoose.Schema({
		name: {
			type: String,
			required:[true, "Name is Required"]
		},
		description: {
			type: String,
			required: [true, "Description is Required"]
		},
		price: {
			type: Number,
			required: [true, "Price is Required"]
		},
		isActive: {
			type: Boolean,
			default: true
		},
		createdOn: {
			type: Date,
			default: new Date()
		}	
	});
//[SECTION] Model
	module.exports = mongoose.model('Product', productSchema);