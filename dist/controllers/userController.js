"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const getAllUsers = async (req, res, next) => {
    if (req.user?.role === "admin") {
        const allUsers = await userModel_1.default.find({}, 'name email age address role updatedAt createdAt').lean();
        res.status(200)
            .json({
            success: true,
            message: "Users fetched successfully",
            data: allUsers,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Only admins can view all users"
        });
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res, next) => {
    const { id } = req.body;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "User id is required"
        });
    }
    if (req.user?._id === id) {
        return res.status(400).json({
            success: false,
            message: "You cannot delete your profile"
        });
    }
    if (req.user?.role === "admin") {
        const user = await userModel_1.default.findByIdAndDelete(id).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200)
            .json({
            success: true,
            message: "User deleted successfully",
            data: user,
        });
    }
    else {
        res.status(402).json({
            success: false,
            message: "Only admins can delete profiles"
        });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map