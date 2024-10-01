import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import router from '../src/routes/adminLoginRoutes';
import adminLoginController from '../src/controller/adminLoginController';
 
jest.mock('../src/controller/adminLoginController');

const app = express();
app.use(bodyParser.json())
app.use(router);

describe('Admin routes', () => {
  it('should call login endpoint', done => {
    (adminLoginController.login as jest.Mock).mockImplementation((req, res) => {
      res.status(200).json({ success: true, token: 'token' });
    });
    request(app).post('/admin/login').send({})
    .then(res => {
      expect(res.status).toBe(200);
      done();
    });
  }, 10000);  
});
