let productModel = require('../../models/product.model');
const _ = require('lodash');
module.exports = async function (req, res, next) {
	let condition = {};
	// check if the query string is valid
	if (_.isEmpty(req.query) || _.size(req.query) > 1) {
		let error = new Error();
		error.message = 'THERE IS NO OR TOO MUCH QUERY STRINGS';
		error.statusCode = 500;
		return next(error);
	}

	switch (_.chain(req.query).keys().toString().value()) { // get the query key
		case 'q': {
			//if the key is q, extract the text and add condition to the object
			condition = {
				$or: [
					{
						name: {
							$regex: `${req.query.q}`, // the text, that we are looking for, as regex expression
							$options: 'i' // i means in this context case-insensitive
						}
					}, {
						description: {
							$regex: `${req.query.q}`,
							$options: 'i'
						}
					}]
			};
			break;
		}
		case 'name': {
			// if the key is name, extract the text and add condition to the object
			condition = {
				name: {
					$regex: `${req.query.name}`,
					$options: 'i'
				}
			};
			break;
		}
		case 'desc': {
			// if the key is desc, extract the text and add condition to the object
			condition = {
				description: {
					$regex: `${req.query.desc}`,
					$options: 'i'
				}
			};
			break;
		}
		default: {
			let error = new Error();
			error.message = 'QUERY STRING NOT SUPPORTED!';
			error.statusCode = 500;
			return next(error);
		}
	}
	
	// look for a product, which satisfies the conditions
	await productModel.find(condition)
		.exec(function (err, products) {
			if (err) {
				let error = new Error();
				error.message = 'INTERNAL ERROR OCCURRED!';
				error.statusCode = 500;
				return next(error);
			}

			res.status(200).json({
				status: 'OK',
				products
			});
		});
};