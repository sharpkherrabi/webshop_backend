let productModel = require('../models/product.model');
const _ = require('lodash');
module.exports = function (req, res, next) {
	let condition = {};
	// if the request contains the id of the product, the backend will deliver just one product...
	// to get just one product, the request has to be send to /product/get/(productId)
	if (!_.isUndefined(req.params.productId))
		condition._id = req.params.productId;


	productModel.find(condition, function (err, products) {
		if (err) {
			let error = new Error();
			error.message = 'INTERNAL ERROR OCCURRED';
			error.statusCode = 500;
			return next(error);
		}
		res.status(200).json({
			status: 'OK',
			products
		});
	});
};

