import { Request, Response, NextFunction } from 'express';
import UserModel from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role === "admin") {
        const allUsers = await UserModel.find({}, 'name email age address role updatedAt createdAt').lean();
        res.status(200)
            .json({
                success: true,
                message: "Users fetched successfully",
                data: allUsers,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Only admins can view all users"
        })
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body
    if (!id) {
        res.status(400).json({
            success: false,
            message: "User id is required"
        })
    }
    if (req.user?._id === id) {
        return res.status(400).json({
            success: false,
            message: "You cannot delete your profile"
        })
    }
    if (req.user?.role === "admin") {
        const user = await UserModel.findByIdAndDelete(id).lean();
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        res.status(200)
            .json({
                success: true,
                message: "User deleted successfully",
                data: user,
            })
    } else {
        res.status(402).json({
            success: false,
            message: "Only admins can delete profiles"
        })
    }
}

