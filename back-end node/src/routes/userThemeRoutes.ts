import { Router } from "express";
import { getallThemes, selectThemes } from "../controller/userThemeController";

const router: Router = Router();

router.get('/getallThemes', getallThemes);
router.post('/selectTheme', selectThemes);

export default router;