/** Package import */
const _ = require('lodash');

/** File import */
const orderModel = require('../../models/order.model');


module.exports = async function (req, res, next) {
	if (!_.isUndefined(req.params.orderId)) {
		await orderModel.findByIdAndRemove(req.params.orderId)
			.exec(function (err, order) {
				if (err){
					let error = new Error();
					error.message = 'COULDN\'T FIND ANY PRODUCT WITH THIS ID';
					error.statusCode = 404;
					return next(error);
				}
				res.status(200).send({
					status: 'DELETED',
					message: 'PRODUCT WITH ID ' + order._id + ' IS DELETED'
				});
			});


	} else {
		let error = new Error();
		error.message = 'PRODUCT NOT FOUND';
		error.statusCode = 404;
		return next(error);
	}
};

