const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Generate token
    const token = generateToken(user.id);

    new ApiResponse(201, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
    }, 'User registered successfully').send(res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
        throw new ApiError(401, 'Invalid credentials');
    }

    // Generate token
    const token = generateToken(user.id);

    new ApiResponse(200, {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token
    }, 'User logged in successfully').send(res);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};