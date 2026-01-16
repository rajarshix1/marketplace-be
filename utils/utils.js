const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

function generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET || 'secret');
}

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

function commonResponse(res, success, message, data, statusCode) {
    if (!statusCode) statusCode = success ? 200 : 400;
    return res.status(statusCode).json({
        success,
        message,
        data
    });
}

module.exports = {
    generateToken,
    verifyToken,
    hashPassword,
    comparePassword,
    commonResponse
};
