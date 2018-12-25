const productModel = require('../models/product.model');

module.exports = async function (req, res, next) {
    const productId = req.params.productId;
    const product = await productModel.findOneAndUpdate(  {
        _id: productId
    }, {
            $set: req.body
        }, {
            new: true,
            runValidators: true
        },
        function (error) {
            if (error) return next(new Error('COULDN\'T UPDATE '));
        });

    if (product != null) {
        res.status(200).send({
            status: 'UPDATED',
            data: product
        });
    } else {
        res.status(404).send(
            { status: "NOT FOUND " }
        )
    };
}