"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const loginLimiter_1 = __importDefault(require("../middlewares/loginLimiter"));
const auth_controller_1 = require("../controllers/auth.controller");
router.post('/register', auth_controller_1.register);
router.post('/signin', loginLimiter_1.default, auth_controller_1.signin);
router.post('/signout', auth_controller_1.signout);
router.get('/refresh', auth_controller_1.refresh);
exports.default = router;
//# sourceMappingURL=auth.route.js.map