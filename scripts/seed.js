require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const Category = require('../models/category.model');
const Product = require('../models/product.model');

mongoose.connect(process.env.MONGO_URI).then(async () => {
    const password = await bcrypt.hash(process.env.password, 10);
    await User.create({ name: 'Admin', email: 'admin@example.com', password, role: 'admin' });
    await User.create({ name: 'User 1', email: 'user1@example.com', password, role: 'user' });
    const cat1= await Category.create({ name: 'Electronics' });
    const cat2=await Category.create({ name: 'Books' });
    await Product.create({ name: 'Laptop', description: 'A laptop', price: 1200, stockQuantity: 10, categoryId: cat1._id });
    await Product.create({ name: 'Novel', description: 'A novel', price: 20, stockQuantity: 20, categoryId: cat2._id });
    console.log('seeded');
    process.exit();
});
