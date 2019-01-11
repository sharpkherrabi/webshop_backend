/** File import */
const orderModel = require('../../models/order.model');

module.exports = async function (req, res, next) {
	const orderId = req.params.orderId;
	await orderModel.findOneAndUpdate(  {
		_id: orderId
	}, {
		$set: req.body
	}, {
		new: true,
		runValidators: true
	}
	).exec(function (error, order) {
		if (error){
			let error = new Error();
			error.message = 'COULDN\'T UPDATE ';
			error.statusCode = 500;
			return next(error);
		}

		res.status(200).send({
			status: 'UPDATED',
			order
		});
	});
};