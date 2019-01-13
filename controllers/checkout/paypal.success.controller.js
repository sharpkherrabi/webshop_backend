const paypal = require('paypal-rest-sdk');
module.exports = (req, res, next) => {
	const paymentId = req.query.paymentId;
	const payerId = { payer_id: req.query.PayerID };
	paypal.payment.execute(paymentId, payerId, function (error, payment) {
		if (error) {
			let error = new Error();
			error.message = 'ERROR OCCURRED DURING EXECUTION OF THE PAYMENT';
			error.statusCode = 401;
			return next(error);
		} else {
			if (payment.state == 'approved') {
				res.status(201).json(
					{
						status: 'PAYMENT COMPLETED SUCCESSFULLY',
					});
			} else {
				res.status(505).json(
					{
						status: 'PAYMENT COULD\'T TAKE PLACE',
					});
			}
		}
	});
};