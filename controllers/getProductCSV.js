const productModel = require('../models/product.model');

module.exports = function getCSV(req, res, next) {
	res.status(200).writeHead(200, {
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=products.csv'
	});

	// pipe file using mongoose-csv
	productModel.find(function (err) {
		if (err) {
			let error = new Error();
			error.message = 'COULD\'T GET PRODUCTS AS CSV';
			error.statusCode = 404;
			return next(error);
		}
	})
		.csv(res);
};

