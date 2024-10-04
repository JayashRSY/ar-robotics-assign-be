import express from 'express';
const router = express.Router();
import {
    getAllUsers,
    deleteUser,
} from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';

router.get('/all-users', verifyToken, getAllUsers);
router.post('/delete-user', verifyToken, deleteUser);

export default router;