import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    deleteUser,
} from '../controllers/user.controller.ts';
import { verifyToken } from '../middlewares/verifyToken.ts';

router.get('/all-users', verifyToken, getAllUsers);
router.post('/delete-user', verifyToken, deleteUser);

export default router;