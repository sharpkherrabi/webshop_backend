/** File import */
const productModel = require('../../models/product.model');

module.exports = async function (req, res, next) {
	const productId = req.params.productId;
	await productModel.findOneAndUpdate(  {
		_id: productId
	}, {
		$set: req.body
	}, {
		new: true,
		runValidators: true
	}
	).exec(function (error, product) {
		if (error){
			let error = new Error();
			error.message = 'COULDN\'T UPDATE ';
			error.statusCode = 500;
			return next(error);
		}

		res.status(200).send({
			status: 'UPDATED',
			product
		});
	});
};