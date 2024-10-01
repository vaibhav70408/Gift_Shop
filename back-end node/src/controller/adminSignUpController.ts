import { Request, Response } from 'express';
import UserModel from '../model/userModel';
import adminSignUpService from '../services/accountSignUpService';
import { ERRORS, ACCOUNT_MESSAGES } from '../constants/signUpMessages';

const adminSignUp = (req: Request, res: Response) => {
  const newAdminData: UserModel = req.body;
  adminSignUpService
    .isAccountPresent(newAdminData.userName, newAdminData.email)
    .then(({ userExists, emailExists }) => {
      if (userExists) {
        throw new Error(ERRORS.USERNAME_EXISTS);
      }
      if (emailExists) {
        throw new Error(ERRORS.EMAIL_EXISTS);
      }
      return adminSignUpService.hashPassword(newAdminData.password);
    })
    .then(hashedPassword => {
      newAdminData.password = hashedPassword;
      return adminSignUpService.saveAccount(newAdminData);
    })
    .then(adminData => {
      return res.status(201).json({ message: ACCOUNT_MESSAGES.ADMIN_CREATED_SUCCESSFULLY });
    })
    .catch(error => {
      if (error.message === ERRORS.EMAIL_EXISTS || error.message === ERRORS.USERNAME_EXISTS) {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: ERRORS.USER_CREATION_ERROR });
    });
};

export default { adminSignUp};
