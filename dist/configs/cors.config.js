"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost:5173',
    'https://ar-robotics-assign-fe.vercel.app',
    'https://ar-robotics-assign-fe.vercel.app/'
];
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigin = origin;
        if (allowedOrigins.includes(allowedOrigin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
//# sourceMappingURL=cors.config.js.map