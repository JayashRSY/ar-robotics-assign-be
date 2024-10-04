"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createTokens = (validUser) => {
    const accessToken = jsonwebtoken_1.default.sign({
        _id: validUser._id,
        email: validUser.email,
        name: validUser.name,
        role: validUser.role,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXP_TIME });
    const refreshToken = jsonwebtoken_1.default.sign({ "email": validUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP_TIME });
    return { accessToken, refreshToken };
};
exports.createTokens = createTokens;
//# sourceMappingURL=createTokens.js.map