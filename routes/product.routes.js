const express = require('express');
const router = express.Router();
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { auth, authorize } = require('../middleware/authMiddleware');

router.post('/', auth, authorize('admin'), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', auth, authorize('admin'), updateProduct);
router.delete('/:id', auth, authorize('admin'), deleteProduct);

module.exports = router;
