//[SECTION] Dependencies and Modules
	const User = require('../models/User');
	const Product = require('../models/Product');
	const bcrypt = require('bcrypt');
	const auth = require('../auth');
	const Order = require('../models/Order');


	//Create Order
	module.exports.createOrder = async (data)=>{
		let id = data.userId;
		let order = data.orderId;
		let quantity = parseInt(data.quantity);

			let price = "";
		let isProductUpdated = await Product.findById(order).then(product=>{
				price +=product.price;
			product.orders.push({orderId: order});
			return product.save().then((saved, err)=>{
				if (err) {
					return false;
				} else {
					return true;
				}
			});
		});

		let total = (price*quantity);
		let myOrder = {
			productId: order,
			quantity: quantity,
		}
		let isUserUpdated = await User.findById(id).then(user=>{
			user.orders.push(myOrder);
			return user.save().then((saved, err)=>{
				if (err) {
					return false;
				} else {
					return true;
				}
			});
		});
		let newOrder = new Order({
			userId: id,
			productId: order,
			quantity: quantity,
			totalAmount: total
		})
		return newOrder.save().then((order, err)=>{
			if (err) {
				return false;
			} else {
				return order;
			}
		})
	};