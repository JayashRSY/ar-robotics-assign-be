"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_controller_1 = require("../controllers/user.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
router.get('/all-users', verifyToken_1.verifyToken, user_controller_1.getAllUsers);
router.post('/delete-user', verifyToken_1.verifyToken, user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map