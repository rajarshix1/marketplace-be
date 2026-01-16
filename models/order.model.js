const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./product.model.js');
require('./user.model.js');

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Order', orderSchema);
