/** File imports */
const orderModel = require('../../models/order.model');

module.exports = function (req, res, next) {
    const newOrder = new orderModel(req.body);
    newOrder.save(function(err, order) {
        if (err) {
            let error = new Error();
            error.message = 'INTERNAL ERROR OCCURED!';
            error.statusCode = 500;
            return next(error);
        }
        res.status(201).json(
        {
                status: 'CREATED',
                order
        });
    });
}