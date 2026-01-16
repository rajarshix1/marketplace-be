const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/authMiddleware');
const { addToCart, removeFromCart, getCart } = require('../controllers/user.controller');

router.post('/add-to-cart', auth, addToCart);
router.post('/remove-from-cart', auth, removeFromCart);
router.get('/cart', auth, getCart);



module.exports = router;
