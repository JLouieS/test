//[SECTION] Modules and Dependencies
	const Product = require('../models/Product');

//[SECTION] Functionalities
	//Create Product
	module.exports.createProduct =(reqBody) =>{
	let pName =	reqBody.name;
	let pDesc = reqBody.description;
	let pCost =	reqBody.price;

	let newProduct = new Product ({
		name: pName,
		description: pDesc,
		price: pCost	
	});
		return newProduct.save().then((savedProd, err)=>{
			if (savedProd) {
				return savedProd;
			} else {
				'No Product Has Been Created!';
			}
		});
	};
	//Retrieve All Products
	module.exports.getAllProducts =()=>{
		return Product.find({}).then(result=>{
			return result;
		});
	};
	//Retrieve Single Product
	module.exports.getProduct= (id)=>{
		return Product.findById(id).then((foundProduct, err)=>{
			if (foundProduct) {
				return foundProduct;
			} else {
				return 'Product Not Found!';
			}
		});
	};
	//Retrieve All Active Products
	module.exports.getAllActive = () =>{
		return Product.find({isActive: true}).then(result=>{
			return result;
		});
	}
	//Delete Products
	module.exports.deleteProduct =(id) =>{
		return Product.findByIdAndRemove(id).then((deletedProduct, err)=>{
			if (deletedProduct) {
				return 'Account Deleted Successfully!';
			} else {
				return 'No Account were Removed!';
			}
		})
	}