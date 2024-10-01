import { Request, Response } from 'express';
import adminThemeControllers from '../src/controller/adminThemeController';
import adminThemeServices from '../src/services/adminThemeServices';
import { THEME_DELETED_SUCCESSFULLY,THEME_CREATED_SUCCESSFULLY,THEME_UPDATED_SUCCESSFULLY } from '../src/constants/themeErrorMessages';

jest.mock('../src/services/adminThemeServices');

const mockThemes = {
  themeId: 101,
  themeName: 'Wooden Frame',
  themeDetails: 'Decorate with pictures you love.',
  themePrice: 10,
};

describe('adminThemeControllers', () => {
  const mockRequest: Request = {
    params: {},
    body: {},
  } as Request;
  const mockResponse = {
    send: jest.fn(),
    status: jest.fn(() => mockResponse),
    json: jest.fn(),
    end: jest.fn(),
  } as unknown as Response;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllThemes', () => {
    it('should return all themes', () => {
      (adminThemeServices.getAllThemes as jest.Mock).mockResolvedValue(mockThemes);

      return new Promise<void>((resolve, reject) => {
        adminThemeControllers.getAllThemes(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(mockResponse.send).toHaveBeenCalledWith(mockThemes);
          resolve();
        });
      });
    });
  });

  describe('getThemeById', () => {
    it('should return theme by ID', () => {
      const themeId = '1';
      (adminThemeServices.getThemeById as jest.Mock).mockResolvedValue(mockThemes);
      mockRequest.params = { themeid: themeId };

      return new Promise<void>((resolve, reject) => {
        adminThemeControllers.getThemeById(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(mockResponse.send).toHaveBeenCalledWith(mockThemes);
          resolve();
        });
      });
    });
  });

  describe('createTheme', () => {
    it('should create a theme successfully', () => {
      (adminThemeServices.createTheme as jest.Mock).mockResolvedValue(mockThemes);

      mockRequest.body = mockThemes;

      return new Promise<void>((resolve, reject) => {
        adminThemeControllers.createTheme(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(mockResponse.json).toHaveBeenCalledWith({ success: THEME_CREATED_SUCCESSFULLY });
          resolve();
        });
      });
    });
  });

  describe('updateTheme', () => {
    it('should update a theme successfully', () => {
      const themeId = '1';
      (adminThemeServices.updateTheme as jest.Mock).mockResolvedValue(mockThemes);
      mockRequest.params = { themeid: themeId };
      mockRequest.body = mockThemes;

      return new Promise<void>((resolve, reject) => {
        adminThemeControllers.updateTheme(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(mockResponse.json).toHaveBeenCalledWith({ success: THEME_UPDATED_SUCCESSFULLY });
          resolve();
        });
      });
    });
  });

  describe('deleteTheme', () => {
    it('should delete a theme successfully', () => {
      const themeId = '1';
      (adminThemeServices.deleteTheme as jest.Mock).mockResolvedValue(undefined);
      mockRequest.params = { themeid: themeId };

      return new Promise<void>((resolve, reject) => {
        adminThemeControllers.deleteTheme(mockRequest, mockResponse);
        process.nextTick(() => {
          expect(mockResponse.json).toHaveBeenCalledWith({ success: THEME_DELETED_SUCCESSFULLY });
          resolve();
        });
      });
    });
  });
});
