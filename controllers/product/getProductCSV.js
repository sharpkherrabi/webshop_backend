const productModel = require('../../models/product.model');

module.exports = async function getCSV(req, res, next) {
	/*if (error){
        return next( new Eror ('SOME ERROR'));
    }*/
	res.status(200).writeHead(200, {
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=products.csv'
	});
	
	// pipe file using mongoose-csv
	await productModel.find()
		.csv(res)
		.exec(function (err) {
			if (err) {
				let error = new Error();
				error.message = 'COULD\'T GET PRODUCTS AS CSV';
				error.statusCode = 404;
				return next(error);
			}
		});
};
