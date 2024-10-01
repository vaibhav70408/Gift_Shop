import { Router } from 'express';
import validateUser from '../middleware/validators/userSignUpValidation';
import userSignUpController from '../controller/userSignUpController';

const router: Router = Router();

router.post('/signup', validateUser, userSignUpController.userSignUp);

export default router;
