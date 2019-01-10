let orderModel = require('../../models/order.model');
let _ = require('lodash');
let config = require('../../config/config');
const paypal = require('paypal-rest-sdk');
module.exports = async (req, res, next) => {
	const orderId = req.body.orderId,
		returnUrl = `http://localhost:${config.serverPort}/checkout/paypal/success`, //dummy uri for now
		cancelUrl = `http://localhost:${config.serverPort}/checkout/paypal/cancel`,	//dummy uri for now
		currency = 'EUR';
	let allRoundPrice = 0, items = [];
	if (_.isUndefined(orderId)) {
		let error = new Error();
		error.message = 'NO DEFINED ID!';
		error.statusCode = 404;
		return next(error);
	}
	await new Promise(async (resolve, reject) => {
		await orderModel.findById(orderId)
			.exec(async (err, order) => {
				if (err) {
					let error = new Error();
					error.message = 'NO PRODUCT FOUND!';
					error.statusCode = 500;
					reject({ status: error.message });
					return next(error);
				}
				let item = {};
				allRoundPrice = order.price;
				_.each(order.product, async function (product) {
					item = await orderModel.findInProductModel(product.id);
					if (_.includes(item.status, 'ERROR')) {
						let error = new Error();
						error.message = item.status;
						error.statusCode = 404;
						reject({ status: error.message });
						return next(error);
					} else {
						items.push({
							name: item.product.name,
							sku: 'item',
							price: item.product.unitPrice,
							currency: 'EUR',
							quantity: product.quantity
						});
					}
					if (_.size(order.product) === _.size(items))
						resolve({ status: 'RESOLVED SUCCESSFULLY!' });
				});
			});
	});


	// define payment
	const payReq = JSON.stringify({
		intent: 'sale',
		payer: {
			payment_method: 'paypal'
		},
		redirect_urls: {
			return_url: returnUrl,
			cancel_url: cancelUrl
		},
		transactions: [{
			item_list: {
				items
			},
			amount: {
				total: allRoundPrice.toString(),
				currency: currency
			},
			description: 'Webshop payment...'
		}]
	});

	//create payment
	paypal.payment.create(payReq, function (error, payment) {
		let redirectURL = '';

		if (error) {
			let error = new Error();
			error.message = 'ERROR OCCURRED WHILE TRYING TO REACH PAYPAL SERVER!';
			error.statusCode = 404;
			return next(error);
		} else {
			//get the redirection url from the payment object
			redirectURL = _.chain(payment.links).filter({rel: 'approval_url'}).head().get('href').value();
			res.redirect(redirectURL);
		}
	});
};