import { Request, Response } from 'express';
import adminThemeServices from '../services/adminThemeServices';
import {
  INTERNAL_SERVER_ERROR,
  THEME_NOT_FOUND,
  THEME_CREATED_SUCCESSFULLY,
  THEME_UPDATED_SUCCESSFULLY,
  THEME_DELETED_SUCCESSFULLY,
} from '../constants/themeMessages';

const getAllThemes = (req: Request, res: Response) => {
  adminThemeServices
    .getAllThemes()
    .then(data => res.send(data))
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
};
 
const getThemeById = (req: Request, res: Response) => {
  const themeId = req.params.themeid;
  adminThemeServices
    .getThemeById(themeId)
    .then(data => {
      if (!data) {
        return res.status(404).json({ error: THEME_NOT_FOUND });
      }
      res.send(data);
    })
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
};
 
const createTheme = (req: Request, res: Response) => {
  const themeData = req.body;
  adminThemeServices
    .createTheme(themeData)
    .then(() => res.json({ success: THEME_CREATED_SUCCESSFULLY }))
    .catch(error => {
      res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    });
};
 
const updateTheme = (req: Request, res: Response) => {
  const themeId = req.params.themeid;
  const themeData = req.body;
  adminThemeServices
    .updateTheme(themeId, themeData)
    .then(() => res.json({ success: THEME_UPDATED_SUCCESSFULLY }))
    .catch(error => {
      if (error.message === THEME_NOT_FOUND) {
        return res.status(404).json({ error: THEME_NOT_FOUND });
      } else {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
    });
};
 
const deleteTheme = (req: Request, res: Response) => {
  const themeId = req.params.themeid;
  adminThemeServices
    .deleteTheme(themeId)
    .then(() => res.json({ success: THEME_DELETED_SUCCESSFULLY }))
    .catch(error => {
      if (error.message === THEME_NOT_FOUND) {
        res.status(404).json({ error: THEME_NOT_FOUND });
      } else {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR });
      }
    });
};
 
const adminThemeControllers = {
  getAllThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
};
 
export default adminThemeControllers;
 
