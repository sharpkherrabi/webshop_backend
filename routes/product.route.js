const express = require('express');
const router = express.Router();
const productCreateController = require('../controllers/createProduct.controller');
const productUpdateController = require('../controllers/updateProduct.controller');
const productGetController = require('../controllers/getProduct.controller');
const productDeleteController = require('../controllers/deleteProduct.controller');
const productCSVcontroller = require('../controllers/getProductCSV');
const productSearchController = require('../controllers/searchProduct.controller');

router.post('/create', productCreateController);
router.put('/update/:productId', productUpdateController);
router.get('/get/:productId?', productGetController);
router.get('/getCSV', productCSVcontroller);
router.delete('/delete/:productId?', productDeleteController);

/* looking for products that match the query
    for searching in product's name and description, use the query q: for example /product?search?q=blabla.
    for searching just in product's name, use the query name: for example /product/search?name=blabla.
    for searching just in product's description, use the query desc: for example /product/search?desc=bla.
*/
router.get('/search', productSearchController);



module.exports = router;