import express, { Request, Response, Router } from 'express';
import { findAllGifts, createGift, findGiftById, editGiftById, deleteGiftById } from '../controller/adminGiftsController';
 
import { giftValidation } from '../middleware/validators/adminGiftValidation';
 
const router: Router = express.Router();
 
router.get('/getAllGifts', (req: Request, res: Response) => {
  findAllGifts(req, res);
});
 
router.post('/addGift', giftValidation, (req: Request, res: Response) => {
  createGift(req, res);
});
 
router.get('/getGift/:id', (req: Request, res: Response) => {
  findGiftById(req, res);
});
 
router.put('/editGift/:id', giftValidation, (req: Request, res: Response) => {
  editGiftById(req, res);
});
 
router.delete('/deleteGift/:id', (req: Request, res: Response) => {
  deleteGiftById(req, res);
});
export { router };
 