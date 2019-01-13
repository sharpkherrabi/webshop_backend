/** Package imports */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const paypal = require('paypal-rest-sdk');

/** File imports */
const config = require('./config/config');

/** configure paypal environment with some credentials*/
paypal.configure({
	mode: 'sandbox',
	client_id: config.paypal_client_id,
	client_secret: config.paypal_client_secret
});

//route handlers' functions
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
const checkoutRoute = require('./routes/checkout.route');

// credentials for DB connection
const devDbUrl = `${config.dbUrl}:${config.mongoPort}/${config.db}`;

//CORS options
let corsOptions = {
	origin: function (origin, callback) {
		let isWhitelisted = config.originsWhitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
	},
	credentials: true
};
/** Comment bellow allows us to use console.log : */
/* eslint-disable no-console */

//connection to mongo db
mongoose.connect(devDbUrl, { useNewUrlParser: true })
	.then(() => console.log(' MongoDB connected to ' + devDbUrl));

// Because of DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
mongoose.set('useCreateIndex', true);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//parsing using bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

//creating a route handler
app.use('/product', productRoute);
app.use('/order', orderRoute);
app.use('/checkout', checkoutRoute);
app.use(function (err, req, res, next) {
	if (err)
		res.status(err.statusCode || '500').json(
			{
				message: err.message,
				err
			}
		);
	next();
	/** To avoid next and req is never used */
	//console.log(req.body);
});

//firing the app
app.listen(config.serverPort, () => {
	console.log('listenning on port ' + config.serverPort);
});

module.exports = app;