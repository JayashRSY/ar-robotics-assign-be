"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_1 = require("../utils/error"); // Adjust the path as needed
const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
        || (typeof req.headers.authorization === 'string' ? req.headers.authorization.split(' ')[1] : undefined)
        || (typeof req.headers.Authorization === 'string' ? req.headers.Authorization.split(' ')[1] : undefined);
    if (!token) {
        return next((0, error_1.errorHandler)(401, 'Unauthorized: No valid token provided'));
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err)
            return res.status(403).json({ message: 'Forbidden' });
        // Ensure the decoded token is of the expected type
        if (decoded) {
            req.user = decoded;
        }
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.js.map