import ThemeModel from '../model/themeModel';
import Theme from '../types/theme';
import { THEME_NOT_FOUND } from '../constants/themeMessages';

const getAllThemes = () => {
  return ThemeModel.findAll();
};
 
const getThemeById = (themeId: string) => {
  return ThemeModel.findByPk(themeId);
};
 
const createTheme = (themeData: Theme) => {
  return ThemeModel.create(themeData);
};
 
const updateTheme = (themeId: string, themeData: Theme) => {
  return getThemeById(themeId).then(theme => {
    if (theme) {
      return ThemeModel.update(themeData, { where: { themeId } });
    } else {
      throw new Error(THEME_NOT_FOUND);
    }
  });
};
 
const deleteTheme = (themeId: string) => {
  return getThemeById(themeId).then(theme => {
    if (theme) {
      return theme.destroy();
    } else {
      throw new Error(THEME_NOT_FOUND);
    }
  });
};
 
const adminThemeServices = {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
};
 
export default adminThemeServices;
 