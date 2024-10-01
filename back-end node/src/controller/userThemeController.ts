import { Request, Response } from "express";
import userThemeService from '../services/userThemeService';
import { INTERNAL_SERVER_ERROR, THEME_SELECTED_SUCCESSFULLY } from '../constants/themeMessages';

export const getallThemes = (req: Request, res: Response) => {
    userThemeService
        .getallThemes()
        .then(data => res.send(data))
        .catch(error => {
            res.status(500).json({ error: INTERNAL_SERVER_ERROR });
        });
};

export const selectThemes = (req: Request, res: Response) => {
    const data = req.body;
    const session = req.session;
    try {
        userThemeService.selectThemes(session, data);
        res.status(201).json({ success: THEME_SELECTED_SUCCESSFULLY});
    } catch (error) {
        res.status(500).json({ error: INTERNAL_SERVER_ERROR }); 
    }
};

 
const userThemeController = {
    getallThemes,
    selectThemes
  };
   
export default userThemeController;
