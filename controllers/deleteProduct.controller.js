const productModel = require('../models/product.model');

module.exports = async function (req, res, next) {
    await productModel.findByIdAndRemove(req.params.productId, function (err) { if (err) return next("COULDN'T FIND ANY PRODUCT WITH THIS ID") });
    res.status(200).send({
        status: 'DELETED'
    });
}