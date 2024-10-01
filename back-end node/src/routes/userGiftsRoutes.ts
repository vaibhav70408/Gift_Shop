import express, { Request, Response, Router } from 'express';
import { selectGift, getAllGift } from '../controller/userGiftsController';

const router: Router = express.Router();

router.post('/selectGifts',(req:Request,res:Response)=>{
    selectGift(req,res);
})
router.get('/getallGifts', getAllGift);

export default router