const Product = require('../models/product.model');
const { commonResponse } = require('../utils/utils');

async function createProduct(req, res) {
    try {
        const { name, description, price, stockQuantity, categoryId } = req.body;
        if (!name || !description || !price || !stockQuantity || !categoryId) {
            return commonResponse(res, false, 'All fields are required', {}, 400);
        }
        const productExists = await Product.findOne({ name });
        if (productExists) {
            return commonResponse(res, false, 'Product already exists', {}, 400);
        }
        
        const product = await Product.create({ name, description, price, stockQuantity, categoryId });
        commonResponse(res, true, 'Success', product, 201);
    } catch (err) {
        commonResponse(res, false, err.message, {});
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
        commonResponse(res, true, 'Success', { products, total, page, totalPages: Math.ceil(total / limit) });
    } catch (err) {
        commonResponse(res, false, err.message, {});
    }
}

async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', product);
    } catch (err) {
        commonResponse(res, false, err.message, {});
    }
}

async function updateProduct(req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', product);
    } catch (err) {
        commonResponse(res, false, err.message, {});
    }
}

async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return commonResponse(res, false, 'Product not found', {}, 404);
        commonResponse(res, true, 'Success', {});
    } catch (err) {
        commonResponse(res, false, err.message, {});
    }
}

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
