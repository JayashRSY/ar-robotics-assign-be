import mongoose, { Document, Schema } from "mongoose";

// Define an interface representing a document in MongoDB.
interface IUser extends Document {
    name: string;
    age: number;
    address: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
}

// Define the schema corresponding to the document interface.
const userSchema: Schema<IUser> = new mongoose.Schema({
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
const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
