import { Router } from 'express';
import adminThemeControllers from '../controller/adminThemeController';
import validateTheme from '../middleware/validators/adminThemeValidation';

const router: Router = Router();

router.get('/themes', adminThemeControllers.getAllThemes);

router.get('/getTheme/:themeid', adminThemeControllers.getThemeById);

router.post('/addTheme', validateTheme, adminThemeControllers.createTheme);

router.put('/editTheme/:themeid', validateTheme, adminThemeControllers.updateTheme);

router.delete('/deleteTheme/:themeid', adminThemeControllers.deleteTheme);

export default router;
