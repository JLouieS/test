//[SECTION] Dependencies and Modules
	const User = require('../models/User');
	const Product = require('../models/Product');
	const bcrypt = require('bcrypt');
	const auth = require('../auth');
	const Order = require('../models/Order');

//[SECTION] Functionalities [Create]
	//Create Order
	module.exports.createOrder = async (data)=>{
		let id = data.userId;
		let order = data.orderId;
		let quantity = parseInt(data.quantity);

			let price = "";
		let saveProduct = await Product.findById(order).then(product=>{
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
		let saveUser = await User.findById(id).then(user=>{
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
//[SECTION] Functionalities [Retrieve]
	//Retrieve Authenticated User's Orders
	module.exports.getOrders =(id)=>{
			return Order.find({userId: id}).then(result=>{
				return result;
			});
		};

	//Retrieve All Orders
	module.exports.getAllOrders = ()=>{
		return Order.find({}).then(result=>{
			return result;
		});
	};
	//Retrieve Orders (Checkout)
	module.exports.checkOutOrders =(id)=>{
		return Order.find({userId: id}).then(result=>{
			let totalAmount = result.map(x=>x.totalAmount).reduce((a,b)=>a+b,0);
			return `Total Amount to Pay: P${totalAmount} 
			${result}`;
		});
	};