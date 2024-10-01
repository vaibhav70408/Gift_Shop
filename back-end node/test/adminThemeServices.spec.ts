import ThemeModel from '../src/model/themeModel';
import adminThemeServices from '../src/services/adminThemeServices';
import Theme from '../src/types/theme';

const themeData: Theme = {
  themeId: 101,
  themeName: 'Wooden Frame',
  themeDetails: 'Decorate with pictures you love.',
  themePrice: 300,
};

jest.mock('../src/model/themeModel.ts');

describe('adminThemeServices', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllThemes', () => {
    it('should return all themes', () => {
      (ThemeModel.findAll as jest.Mock).mockResolvedValue(themeData);
      return adminThemeServices.getAllThemes().then(result => {
        expect(result).toEqual(themeData);
      });
    });
  });

  describe('getThemeById', () => {
    it('should return a theme by ID', () => {
      const themeId = '101';
      const createdThemeMock: Theme = { ...themeData };
      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(createdThemeMock);

      return adminThemeServices.getThemeById(themeId).then(result => {
        expect(result).toEqual(createdThemeMock);
      });
    });

    it('should return null if theme is not found', () => {
      const themeId = '2';
      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(null);

      return adminThemeServices.getThemeById(themeId).then(result => {
        expect(result).toBeNull();
      });
    });
  });

  describe('createTheme', () => {
    it('should create a new theme', () => {
      const createdThemeMock: Theme = { ...themeData };
      (ThemeModel.create as jest.Mock).mockResolvedValue(createdThemeMock);

      return adminThemeServices.createTheme(themeData).then(result => {
        expect(result).toEqual(createdThemeMock);
      });
    });
  });

  describe('updateTheme', () => {
    it('should update a theme by ID', () => {
      const themeId = '101';
      const themeMock: { themeId: string; update: (data: Theme) => Promise<void> } = {
        themeId,
        update: jest.fn().mockResolvedValue(undefined),
      };

      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(themeMock);

      return expect(adminThemeServices.updateTheme(themeId, themeData)).resolves.toBeUndefined();
    });

    it('should throw an error if the theme is not found', () => {
      const themeId = '2';
      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(null);

      return expect(adminThemeServices.updateTheme(themeId, themeData)).rejects.toThrow('Theme not found');
    });
  });

  describe('deleteTheme', () => {
    it('should delete a theme by ID', () => {
      const themeId = '101';
      const themeMock: { themeId: string; destroy: () => Promise<void> } = {
        themeId,
        destroy: jest.fn().mockResolvedValue(undefined),
      };

      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(themeMock);

      return expect(adminThemeServices.deleteTheme(themeId)).resolves.toBeUndefined();
    });

    it('should throw an error if the theme is not found', () => {
      const themeId = '2';
      (ThemeModel.findByPk as jest.Mock).mockResolvedValue(null);

      return expect(adminThemeServices.deleteTheme(themeId)).rejects.toThrow('Theme not found');
    });
  });
});
