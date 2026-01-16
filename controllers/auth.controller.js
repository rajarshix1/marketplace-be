const User = require('../models/user.model');
const { commonResponse, generateToken, hashPassword, comparePassword } = require('../utils/utils');

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user = await User.create({ name, email, password: hashedPassword, role: 'user' });
        const token = generateToken(user._id);
        user.password = undefined;
        commonResponse(res, true, 'Success', { user, token }, 201);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await comparePassword(password, user.password))) {
            return commonResponse(res, false, 'Invalid credentials', {}, 401);
        }
        const token = generateToken(user._id);
        user.password = undefined;
        commonResponse(res, true, 'Success', { user, token }, 200);
    } catch (err) {
        commonResponse(res, false, err.message, {}, 400);
    }
}



module.exports = { register, login };
