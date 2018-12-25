const env = process.env.NODE_ENV || "dev";
// developement configuration object
const dev = {
    db: "product_shop_dev",
    mongoPort: 27017,
    dbUrl: "mongodb://localhost", //windows docker-toolbox: instead of localhost -> mongo and in postman 192.168.99.100:3000
    serverPort: 3000,
    originsWhitelist: [
        'http://localhost:4200',      //CORS white list
    ]
};

// test configuration object
const test = {
    db: "product_shop_test",
    mongoPort: 27017,
    dbUrl: "mongodb://localhost",
    serverPort: 3001
}


//production configuration object
const prod = {};

const config = {
    dev,
    prod,
    test
};

module.exports = config[env];