const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, getAllOrdersAdmin } = require('../controllers/order.controller');
const { auth, authorize } = require('../middleware/authMiddleware');

router.post('/place-order', auth, placeOrder);
router.get('/orders', auth, getOrders);
router.get('/orders-admin', auth, authorize('admin'), getAllOrdersAdmin);
module.exports = router;