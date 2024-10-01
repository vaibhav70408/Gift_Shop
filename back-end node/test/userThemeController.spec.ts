import { Request, Response } from 'express';
import { Session } from "express-session";
import userThemeService from '../src/services/userThemeService';
import userThemeController from '../src/controller/userThemeController';

jest.mock('../src/services/userThemeService');

interface Cart {
  items: any[];
}

interface CustomSession extends Session {
  themecart?: Cart;
}

const mockRequest = (): Request => ({
  session: {} as CustomSession,
  body: {},
} as Request);

const mockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('UserThemeController', () => {
  it('calls ThemeService and returns all themes', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const mockThemes = [{ name: 'light' }, {  name: 'dark' }];
    (userThemeService.getallThemes as jest.Mock).mockResolvedValue(mockThemes);
    await userThemeController.getallThemes(req, res);
    expect(userThemeService.getallThemes).toHaveBeenCalledWith();
    expect(res.send).toHaveBeenCalledWith(mockThemes);
  });

  it('calls selectThemes() and returns status 201', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const data = { id: 1 };
    req.body = data;
    await userThemeController.selectThemes(req, res);
    expect(userThemeService.selectThemes).toHaveBeenCalledWith(req.session, data);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ success: 'Theme selected successfully'});
});

  it('calls selectThemes() and returns status 500 on error', async () => {
    const req = mockRequest();
    const res = mockResponse();
    const data = { id: 1 };
    req.body = data;
    (userThemeService.selectThemes as jest.Mock).mockImplementation(() => {
      throw new Error('Server Error');
    });
    await userThemeController.selectThemes(req, res);
    expect(userThemeService.selectThemes).toHaveBeenCalledWith(req.session, data);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });  
});
});