//[SECTION] Dependencies and Modules
	const jwt = require('jsonwebtoken');
	const dotenv = require('dotenv');

//[SECTION] Environment Variables Setup
	dotenv.config();
	let secret = process.env.SECRET;

//[SECTION] Functionalities
	module.exports.createAccessToken = (authUser) =>{
		const userData = {
			id: authUser._id,
			email: authUser.email,
			isAdmin: authUser.isAdmin
		};
		return jwt.sign(userData, secret, {});
	};
	module.exports.verify = (req, res, next)=>{
		let token = req.headers.authorization;
		if(typeof token!== 'undefined'){
			token = token.slice(7, token.length);
			return jwt.verify(token, secret,(err, payload)=>{
				if (err) {
					return res.send({auth: 'Authorization Failed, Token is Invalid!'});
				} else {
					next();
				};
			});
		} else {
			return res.send({auth: 'Authorization Failed, Check Token'});
		};
	};
	module.exports.decode = (accessToken)=>{
		if (typeof accessToken !== 'undefined') {
			accessToken = accessToken.slice(7, accessToken.length);
			return jwt.verify(accessToken, secret, (err, verified)=>{
				if (err) {
					return null;
				} else {
					return jwt.decode(accessToken, {complete: true}).payload;
				}
			})
		} else {
			return null;
		}
	};