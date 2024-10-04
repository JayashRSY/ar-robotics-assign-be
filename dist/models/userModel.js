"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema corresponding to the document interface.
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
    }
}, { timestamps: true });
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password; // Exclude password
    delete user.__v; // remove version key
    return user;
};
// Create and export the model.
const UserModel = mongoose_1.default.model("User", userSchema);
exports.default = UserModel;
//# sourceMappingURL=userModel.js.map