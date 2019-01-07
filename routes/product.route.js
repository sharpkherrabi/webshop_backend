const express = require('express');
const router = express.Router();
const productCreateController = require('../controllers/product/createProduct.controller');
const productUpdateController = require('../controllers/product/updateProduct.controller');
const productGetController = require('../controllers/product/getProduct.controller');
const productDeleteController = require('../controllers/product/deleteProduct.controller');
const productCSVcontroller = require('../controllers/product/getProductCSV');

router.post('/create', productCreateController);
router.put('/update/:productId', productUpdateController);
router.get('/get/:productId?', productGetController);
router.get('/getCSV', productCSVcontroller);
router.delete('/delete/:productId?', productDeleteController);



module.exports = router;