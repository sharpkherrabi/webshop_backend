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
		if (_.isUndefined(productName)) {
			let error = new Error();
			error.message = 'NO NAME COULD BE RETRIEVED';
			error.statusCode = 404;
			return next(error);
		}


		// check if the product is already in the DB
		await productModel.findOne({ name: productName })
			.exec(function (err, prod) {
				if (err) {
					let error = new Error();
					error.message = 'INTERNAL ERROR';
					error.statusCode = 500;
					return next(error);
				}
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
				if (err) {
					let error = new Error();
					error.message = 'INTERNAL ERROR';
					error.statusCode = 500;
					return next(error);
				}

				status = isNEW ? 'PRODUCT CREATED SUCCESSFULLY' : 'PRODUCT UPDATED SUCCESSFULLY';
				if (!isNEW) {
					product.updateQuantity(priorQuantity);
				}
				product.save((err, product) => {
					if (err) {
						let error = new Error();
						error.message = 'INTERNAL ERROR OCCURED!';
						error.statusCode = 500;
						return next(error);
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