const productModel = require('../models/product.model');
const _ = require('lodash');

module.exports = async function (req, res, next) {
    if(!_.isUndefined(req.params.productId)){
    await productModel.findByIdAndRemove(req.params.productId) 
        .exec(function (err, product) { 
            if (err) return next("COULDN'T FIND ANY PRODUCT WITH THIS ID")
            res.status(200).send({
                status: 'DELETED',
                message: 'PRODUCT WITH ID '+ product._id + ' IS DELETED' 
            });
});
        
        
    }else{
        res.status(404).send({
            message: 'PRODUCT NOT FOUND'
        });
    }
}