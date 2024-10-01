import { Router } from 'express';
import adminLoginController from '../controller/adminLoginController';

const router = Router();

router.post('/login', adminLoginController.adminLogin);
export default router;
