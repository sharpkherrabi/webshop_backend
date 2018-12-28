/** File import */
const productModel = require('../models/product.model');

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
            if (error) return next(new Error('COULDN\'T UPDATE '));

            res.status(200).send({
                status: 'UPDATED',
                product
            });
        });
}