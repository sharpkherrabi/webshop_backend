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
			let condition = {},
				found = {}, available = 0;
			for (let i in req.body.product) {
				condition._id = req.body.product[i].id;
				found = await orderModel.findInProductModel(condition._id);

				/** Calculate price */
				newOrder.price = newOrder.price + found.product.unitPrice * newOrder.product[i].quantity;

				/** Update product quantity number 
				 * A.findByIdAndUpdate(id, update, options, callback) // executes
				*/
				available = found.product.quantity;
				if (available - newOrder.product[i].quantity < 0) {
					let error = new Error();
					error.message = 'NOT ENOUGH PRODUCTS IN WAREHOUSE ';
					error.statusCode = 500;
					return next(error);
				}
				try {
					await productModel.findByIdAndUpdate(condition._id, { quantity: available - newOrder.product[i].quantity }, { runValidators: true, new: true });
				} catch (error) {
					return next(error);
				}
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