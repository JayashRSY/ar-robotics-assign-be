import express, { Request, Response, NextFunction } from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import morgan from "morgan";
import helmet from "helmet";
import dotenv from 'dotenv';
import mongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import httpStatus from 'http-status';
import path from 'path';
import { fileURLToPath } from 'url';
import corsOptions from './configs/corsConfig';
import connectDB from './utils/mongo';
// import { logger } from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import authRoutes from './routes/authRoute';
import userRoutes from './routes/userRoute';



dotenv.config({ path: './.env' });


const app = express();

connectDB()
// app.use(logger)

// parse json request body
app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));
// enable cors
app.use(cors(corsOptions))
app.use(cookieParser());
// set security HTTP headers
app.use(helmet());
// sanitize request data
app.use(mongoSanitize());
// gzip compression
app.use(compression());




// jwt authentication

// limit repeated failed requests to auth endpoints
// if (process.env.ENV === 'production') {
//     app.use('/api/auth', authLimiter);
// }

// Routes
app.get('/', async (req, res, next) => {
    res.status(200).send({ message: "Server is up and running" })
})
app.use("/api", authRoutes);
app.use("/api/admin", userRoutes);

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
app.use(errorHandler)

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});