const mongoose = require('mongoose');
const Cart = require('../models/cart.model.js');
const Order = require('../models/order.model.js');
const Product = require('../models/product.model.js');
const { commonResponse } = require('../utils/utils.js');

async function placeOrder( req, res) {
    const session = await mongoose.startSession();
    try {
        const userId = req.user._id;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        session.startTransaction();
        const product = await Product.findOneAndUpdate(
            { _id: productId, stockQuantity: { $gte: quantity } },
            { $inc: { stockQuantity: -quantity } },
            { session, new: true }
        );
        if (!product) {
            throw new Error('Product not found or insufficient stock');
        }
        const [order] = await Order.create([{
            userId,
            product: productId,
            quantity,
            totalPrice: product.price * quantity
        }], { session });
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter(p => p.productId._id.toString() !== productId);
            await cart.save({ session });
        }
        await session.commitTransaction();
        commonResponse(res, true, 'Success', order, 201);
    } catch (error) {
        await session.abortTransaction();
        commonResponse(res, false, error.message, {}, 400);
    }
}

async function getOrders(req, res) {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ userId }).populate('product', 'name description');
        commonResponse(res, true, 'Success', orders, 200);
    } catch (error) {
        commonResponse(res, false, error.message, {}, 400);
    }
}

async function getAllOrdersAdmin(req, res) {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = {};
        const total = await Order.countDocuments(filter);
        const orders = await Order.find().populate('product', 'name description').populate('userId', 'name email').limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 });
        commonResponse(res, true, 'Success', {orders, total, page, totalPages: Math.ceil(total / limit)}, 200);
    } catch (error) {
        commonResponse(res, false, error.message, {}, 400);
    }
}

module.exports = { placeOrder, getOrders, getAllOrdersAdmin };