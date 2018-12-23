const env = process.env.NODE_ENV || "dev";
// developement configuration object
const dev = {
    db: "product_shop_test",
    mongoPort: 27017,
    dbUrl: "mongodb://localhost",
    originsWhitelist: [
        'http://localhost:4200',      //CORS white list
    ]
};

//production configuration object
const prod = {};

const config = {
    dev,
    prod
};

module.exports = config[env];