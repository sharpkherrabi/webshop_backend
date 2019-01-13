const express = require('express');
const router = express.Router();

//create controller for handling the requests
const paypalController = require('../controllers/checkout/paypal.controller');
const paypalSuccess = require('../controllers/checkout/paypal.success.controller');
const paypalCancel = require('../controllers/checkout/paypal.cancel.controller');

/**
 * to checkout with paypal, make a post request to /checkout/paypal.
 * request body:
 * orderId:	the id of the order.
 */
router.post('/paypal', paypalController);

router.get('/paypal/success', paypalSuccess);

router.get('paypal/cancel', paypalCancel);

module.exports = router;