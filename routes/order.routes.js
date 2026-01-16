const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, getAllOrdersAdmin } = require('../controllers/order.controller');
const { auth, authorize } = require('../middleware/authMiddleware');

router.post('/place-order', auth, placeOrder);
router.get('/all', auth, getOrders);
router.get('/all-admin', auth, authorize('admin'), getAllOrdersAdmin);
module.exports = router;