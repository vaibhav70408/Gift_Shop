import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import userLoginController from '../src/controller/userLoginController';
import accountLoginServices from '../src/services/accountLoginService';
import { LOGIN_ERROR_MESSAGE } from '../src/constants/loginErrorMessages';

jest.mock('../src/services/accountLoginService');

const app = express();
app.use(bodyParser.json());
app.post('/user/login', userLoginController.userLogin);

describe('POST /user/login', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should respond with a 200 status and a token upon successful authentication', () => {
    (accountLoginServices.authenticateAccount as jest.Mock).mockResolvedValueOnce({ success: true, token: 'mockToken' });
    (accountLoginServices.createCSRFToken as jest.Mock).mockResolvedValueOnce('mockCSRFToken');

    return request(app)
      .post('/user/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ success: true, token: 'mockToken' });
        expect(response.header['x-csrf-token']).toEqual('mockCSRFToken');
      });
  });

  it('should respond with a 401 status if authentication is unsuccessful', () => {
    (accountLoginServices.authenticateAccount as jest.Mock).mockResolvedValueOnce({ success: false });

    return request(app)
      .post('/user/login')
      .send({ email: 'test@example.com', password: 'wrongpassword' })
      .expect(401)
      .then(response => {
        expect(response.body).toEqual({ success: false, message: LOGIN_ERROR_MESSAGE.INVALID_EMAIL_PASSWORD });
      });
  });

  it('should respond with a 500 status if there is an internal server error', () => {
    (accountLoginServices.authenticateAccount as jest.Mock).mockRejectedValueOnce(new Error());

    return request(app)
      .post('/user/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(500)
      .then(response => {
        expect(response.body).toEqual({ success: false, message: LOGIN_ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      });
  });
});
