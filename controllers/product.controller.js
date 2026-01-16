const Product = require('../models/product.model');
const { commonResponse } = require('../utils/utils');

async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body);
        commonResponse(res, true, 'Success', product, 201);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

async function getProducts(req, res) {
    try {
        const { page = 1, limit = 10, category, minPrice, maxPrice } = req.query;
        const filter = {};
        if (category) filter.categoryId = category;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseFloat(minPrice);
            if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }
        const products = await Product.find(filter)
            .populate('categoryId')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });
        const total = await Product.countDocuments(filter);
        commonResponse(res, true, 'Success', { products, total, page, totalPages: Math.ceil(total / limit) }, 200);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', product, 200);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', product, 200);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', {}, 200);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
