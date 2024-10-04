"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const compression_1 = __importDefault(require("compression"));
const corsConfig_1 = __importDefault(require("./configs/corsConfig"));
const mongo_1 = __importDefault(require("./utils/mongo"));
// import { logger } from './middlewares/logger';
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
(0, mongo_1.default)();
// app.use(logger)
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// enable cors
app.use((0, cors_1.default)(corsConfig_1.default));
app.use((0, cookie_parser_1.default)());
// set security HTTP headers
app.use((0, helmet_1.default)());
// sanitize request data
app.use((0, express_mongo_sanitize_1.default)());
// gzip compression
app.use((0, compression_1.default)());
// jwt authentication
// limit repeated failed requests to auth endpoints
// if (process.env.ENV === 'production') {
//     app.use('/api/auth', authLimiter);
// }
// Routes
app.get('/', async (req, res, next) => {
    res.status(200).send({ message: "Server is up and running" });
});
app.use("/api", authRoute_1.default);
app.use("/api/admin", userRoute_1.default);
// Error Handling Middleware
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || 'Internal Server Error';
//     return res.status(statusCode).json({
//         success: false,
//         message,
//         statusCode
//     });
// });
app.use(errorHandler_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map