"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middlewares/verifyToken");
router.get('/all-users', verifyToken_1.verifyToken, userController_1.getAllUsers);
router.post('/delete-user', verifyToken_1.verifyToken, userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map