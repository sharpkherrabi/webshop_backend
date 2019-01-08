let orderModel = require('../../models/order.model');
const _ = require('lodash');
module.exports = function (req, res, next) {
	let condition = {};
	// if the request contains the id of the order, function returns one order.
	// request to get one order:  /order/get/(productId)
	if (!_.isUndefined(req.params.orderId))
		condition._id = req.params.orderId;


	orderModel.find(condition, function (err, orders) {
		if (err) {
			let error = new Error();
			error.message = 'INTERNAL ERROR OCCURRED';
			error.statusCode = 500;
			return next(error);
		}
		res.status(200).json({
			status: 'OK',
			orders
		});
	});
};

