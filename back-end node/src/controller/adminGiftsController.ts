import { getAllGifts, addGift, getGiftById, updateGiftById, destroyGiftById } from '../services/adminGiftsService';
import { Request, Response } from 'express';
import { GIFT_MESSAGE } from '../constants/giftMessages';

const findAllGifts = (req: Request, res: Response) => {
  getAllGifts()
    .then(gift => res.send(gift))
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

const createGift = (req: Request, res: Response) => {
  const data = req.body;
  addGift(data)
    .then(() => res.status(200).json({ success: GIFT_MESSAGE.DATA_ADDED_SUCCESSFULLY }))
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

const findGiftById = (req: Request, res: Response) => {
  const giftId = req.params.id;
  getGiftById(giftId)
    .then(gift => {
      if (!gift) {
        return res.status(404).json({ error: GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR });
      }
      res.send(gift);
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err });
    });
};

const editGiftById = (req: Request, res: Response) => {
  const giftData = req.body;
  const giftId = req.params.id;
  updateGiftById(giftId, giftData)
    .then(() => res.json({ success: GIFT_MESSAGE.DATA_UPDATED_SUCCESSFULLY }))
    .catch((err: Error) => {
      if (err.message === GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR) {
        return res.status(404).json({ error: GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR });
      }
      res.status(500).json({ error: err });
    });
};

const deleteGiftById = (req: Request, res: Response) => {
  const giftId = req.params.id;
  destroyGiftById(giftId)
    .then(() => res.json({ success: GIFT_MESSAGE.DATA_DELETED_SUCCESSFULLY }))
    .catch((err: Error) => {
      if (err.message === GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR) {
        return res.status(404).json({ error: GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR });
      }
      res.status(500).json({ error: err });
    });
};

export { findAllGifts, createGift, findGiftById, editGiftById, deleteGiftById };
