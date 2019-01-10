const env = process.env.NODE_ENV || 'dev';
// developement configuration object
const dev = {
	db: 'product_shop_dev',
	mongoPort: 27017,
	dbUrl: 'mongodb://localhost', //windows docker-toolbox: instead of localhost -> mongo and in postman 192.168.99.100:3000
	serverPort: 3000,
	originsWhitelist: [
		'http://localhost:4200',      //CORS white list
	],
	paypal_client_id:'AcM070V8xIvHGN-Y2BjU9DmVLSDFd9fiNo9s_766boS1dqanynm-TU3er6E4nGJf2lnQcg3jeeCUgQ_y',
	paypal_client_secret: 'ELp9HQxDsiWxHtvk_ZHEQq6WiEEWA_0YOS7_CFNZyungRTLHgiLpUApuSe6lhlxRZfpCkmeNM0bLbbw0'
};

// test configuration object
const test = {

	db: 'product_shop_test',
	mongoPort: 27017,
	dbUrl: 'mongodb://localhost',
	serverPort: 3001,
	originsWhitelist: [
		'http://localhost:4200',      //CORS white list
	]
};

const testCI = {

	db: 'product_shop_test',
	mongoPort: 27017,
	dbUrl: 'mongodb://mongo',
	serverPort: 3001,
	originsWhitelist: [
		'http://localhost:4200',      //CORS white list
	]
};

const docker = {
	db: 'product_shop_doc',
	mongoPort: 27017,
	dbUrl: 'mongodb://mongo', //windows docker-toolbox: instead of localhost -> mongo and in postman 192.168.99.100:3000
	serverPort: 3000,
	originsWhitelist: [
		'http://localhost:4200',      //CORS white list
	]
};

//production configuration object
const prod = {};

const config = {
	dev,
	prod,
	test,
	docker, 
	testCI
};

module.exports = config[env];