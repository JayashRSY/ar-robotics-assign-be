"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookieConfig = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
};
exports.default = cookieConfig;
//# sourceMappingURL=cookieConfig.js.map