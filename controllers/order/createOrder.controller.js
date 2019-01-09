/** File imports */
const orderModel = require('../../models/order.model');
const productModel = require('../../models/product.model');
const _ = require('lodash');

//Calculate price and post
module.exports = async function (req, res, next) {

	const newOrder = new orderModel(req.body);
	if (!_.isUndefined(newOrder)) {
		if (!_.isUndefined(newOrder.product)) {
			newOrder.price = 0;
			let condition = {};
			for (let i in req.body.product) {
				condition._id = req.body.product[i].id;
				let found = await productModel.findById(condition._id, function (err) {
					if (err) {
						let error = new Error();
						error.message = 'INTERNAL ERROR OCCURRED';
						error.statusCode = 500;
						return next(error);
					}
				}).exec();
				newOrder.price = newOrder.price + found.unitPrice * newOrder.product[i].amount;
			}
		}
	}
	newOrder.save(function (err, order) {
		if (err) {
			let error = new Error();
			error.message = 'INTERNAL ERROR OCCURED!';
			error.statusCode = 500;
			return next(error);
		}

		res.status(201).json(
			{
				status: 'CREATED',
				order
			});
	});

};