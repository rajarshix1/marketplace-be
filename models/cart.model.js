const mongoose = require('mongoose');
const { Schema } = mongoose;
require('./product.model.js');
require('./user.model.js');

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});
module.exports = mongoose.model('Cart', cartSchema);