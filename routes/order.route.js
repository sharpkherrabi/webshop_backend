const express = require('express');
const router = express.Router();

const orderCreateController = require('../controllers/order/createOrder.controller');
const orderGetController = require('../controllers/order/getOrder.controller');
const orderDeleteController = require('../controllers/order/deleteOrder.controller');
//const orderUpdateController  =require('../controllers/order/updateOrder.controller');

router.post('/create', orderCreateController);
router.get('/get/:orderId?', orderGetController);
router.delete('/delete/:orderId', orderDeleteController);
//router.put('/update/:orderId', orderUpdateController);

module.exports = router;

