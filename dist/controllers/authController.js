"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = exports.refresh = exports.signin = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = __importDefault(require("../models/userModel"));
const createTokens_1 = require("../utils/createTokens");
const cookieConfig_1 = __importDefault(require("../configs/cookieConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    try {
        const { name, email, age, address, password, role } = req.body;
        // Check if the necessary fields are provided
        if (!email || !password || !name || !age || !address) {
            res.status(400).json({ success: false, message: 'Email, name, age, address and password are required' });
            return;
        }
        const hashedPassword = bcryptjs_1.default.hashSync(password, 12); // hashSync is synchronous
        const existingUser = await userModel_1.default.findOne({ email }).lean();
        if (existingUser) {
            res.status(409).json({ success: false, message: 'User already exists' });
            return;
        }
        const newUser = new userModel_1.default({
            name,
            age,
            address,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res.status(201).json({
            success: true,
            message: 'Signed up successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Validate the request body
        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }
        const validUser = await userModel_1.default.findOne({ email }).exec();
        if (!validUser) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }
        const validPassword = bcryptjs_1.default.compareSync(password, validUser.password);
        if (!validPassword) {
            res.status(401).json({ success: false, message: 'Invalid password' });
            return;
        }
        const { accessToken, refreshToken } = (0, createTokens_1.createTokens)(validUser);
        res.cookie('refreshToken', refreshToken, cookieConfig_1.default)
            .status(200)
            .json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            data: validUser
        });
    }
    catch (error) {
        next(error);
    }
};
exports.signin = signin;
const refresh = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies?.refreshToken) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    const refreshToken = cookies.refreshToken;
    jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        if (typeof decoded !== 'object' || !decoded) {
            res.status(403).json({ message: 'Forbidden' });
            return;
        }
        const { email } = decoded;
        const validUser = await userModel_1.default.findOne({ email }).exec();
        if (!validUser) {
            res.status(401).json({ message: 'Unauthorized' });
            return;
        }
        const { accessToken, refreshToken } = (0, createTokens_1.createTokens)(validUser);
        res.cookie('refreshToken', refreshToken, cookieConfig_1.default)
            .status(200)
            .json({
            success: true,
            message: 'User logged in successfully',
            accessToken,
            data: validUser
        });
    });
};
exports.refresh = refresh;
const signout = (req, res, next) => {
    // const cookies = req.cookies;
    // if (!cookies?.refreshToken) {
    //     res.sendStatus(204); // No content
    //     return;
    // }
    res.clearCookie('refreshToken', {
        httpOnly: true,
        sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
        secure: process.env.NODE_ENV === 'production',
    })
        .status(200)
        .json({ success: true, message: 'Signed out successfully' });
};
exports.signout = signout;
//# sourceMappingURL=authController.js.map