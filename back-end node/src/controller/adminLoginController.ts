import { Request, Response } from 'express';
import adminLoginServices from '../services/accountLoginService';
import { LOGIN_ERROR_MESSAGE } from '../constants/loginErrorMessages';

const adminLogin = (req: Request, res: Response): void => {
  const { email, password } = req.body;
  adminLoginServices
    .authenticateAccount({ email, password })
    .then(authResponse => {
      if (authResponse.success) {
        return adminLoginServices.createCSRFToken().then(token => {
          res.set('X-CSRF-Token', token);
          res.cookie('jwt', authResponse.token);
          res.json({ success: true, token: authResponse.token });
        });
      } else {
        res.status(401).json({ success: false, message: LOGIN_ERROR_MESSAGE.INVALID_EMAIL_PASSWORD });
      }
    })
    .catch(error => {
      res.status(500).json({ success: false, message: LOGIN_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    });
};

export default { adminLogin };
