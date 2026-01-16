const Cart = require('../models/cart.model.js');
const { commonResponse } = require('../utils/utils.js');

async function addToCart(req, res) {
    try {
        const userId = req.user._id;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, products: [] });
        }
        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
        if (productIndex > -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        await cart.save();
        commonResponse(res, true, "Success", cart, 201);
    } catch (error) {
        commonResponse(res, false, error.message, {}, 400);
    }
}

async function removeFromCart(req, res) {
    try {
                const userId = req.user._id;
                const productId = req.body.productId;
                const type = req.body.type; // 'decrease' or 'remove'
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            throw new Error('Cart not found');
        }
        if (type === 'decrease') {
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
            cart.products[productIndex].quantity -= 1;
        } else if (type === 'remove') {
        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        }
        await cart.save();
        commonResponse(res, true, "Success", cart, 201);
    } catch (error) {
        commonResponse(res, false, error.message, {}, 400);
    }
}

async function getCart(req, res) {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            throw new Error('Cart not found');
        }
        commonResponse(res, true, "Success", cart, 200);
    } catch (error) {
        commonResponse(res, false, error.message, {}, 400);
    }
}



module.exports = { addToCart, removeFromCart, getCart };