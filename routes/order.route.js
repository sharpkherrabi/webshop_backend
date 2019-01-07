const express = require('express');
const router = express.Router();

const orderCreateController = require('../controllers/createOrder.controller');

router.post('/create', orderCreateController);

module.exports = router;

