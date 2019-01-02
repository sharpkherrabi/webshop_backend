const productModel = require('../models/product.model');

module.exports = async function getCSV (req, res, next){
	/*if (error){
        return next( new Eror ('SOME ERROR'));
    }*/
	res.status(200).writeHead(200, {
		'Content-Type': 'text/csv',
		'Content-Disposition': 'attachment; filename=products.csv'
	});
	// pipe file using mongoose-csv
	await productModel.find(
		function(err){ 
			if( err ) 
				return next (new Error ('COULD\'T GET PRODUCTS AS CSV'));            
		})
	// .exec(function(err, products){ if( err ) return next (new Error ('COULD\'T GET PRODUCTS AS CSV'))})
		.csv(res);
};
