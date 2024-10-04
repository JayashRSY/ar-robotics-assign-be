"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.CustomError = CustomError;
const errorHandler = (statusCode, message) => {
    console.log("🚀errHand", statusCode, message);
    const error = new CustomError(statusCode, message);
    return error;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map