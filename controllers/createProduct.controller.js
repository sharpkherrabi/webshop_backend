/** Comment bellow allows us to use console.log  when testing with eslint: */
/* eslint-disable no-console */

let productModel = require('../models/product.model');
let _ = require('lodash');

module.exports = async function (req, res, next) {
	if (req.body) {
		let status = '',
			isNEW = false,
			priorQuantity = 0;
		const options = { new: true, runValidators: true, upsert: true },
			productName = req.body.name;
		if (_.isUndefined(productName))
			return next(new Error('NO NAME COULD BE RETRIEVED'));

		// check if the product is already in the DB
		await productModel.findOne({ name: productName })
			.exec(function (err, prod) {
				if (err) next(new Error('INTERNAL ERROR'));
				if (_.isNull(prod)) {
					isNEW = true;
				} else {
					priorQuantity = prod.quantity;
				}
			});
		productModel.findOneAndUpdate(
			{ name: productName },
			req.body,
			options,
			function (err, product) {
				if (err)
					return next(new Error('INTERNAL ERROR'));
				status = isNEW ? 'PRODUCT CREATED SUCCESSFULLY' : 'PRODUCT UPDATED SUCCESSFULLY';
				if (!isNEW) {
					product.updateQuantity(priorQuantity);
				}
				product.save((err, product) => {
					if (err) {
						return next(new Error('INTERNAL ERROR OCCURED!'));
					}
					res.status(201).json(
						{
							status,
							product
						});
				});
			}
		);
	}
};