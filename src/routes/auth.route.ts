import express from 'express';
const router = express.Router();
import loginLimiter from '../middlewares/loginLimiter.ts';
import {
    refresh,
    register,
    signin,
    signout,
} from '../controllers/auth.controller.ts';

router.post('/register', register);
router.post('/signin', loginLimiter, signin);
router.post('/signout', signout);
router.get('/refresh', refresh);

export default router;