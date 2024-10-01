import { gifts } from '../model/gifts';
import { gift } from '../types/gifts';
import { v4 as uuidv4 } from 'uuid';
import { GIFT_MESSAGE } from '../constants/giftMessages';

const getAllGifts = () => {
  return gifts.findAll();
};

const addGift = (data: gift) => {
  const uuid = uuidv4();
  data.giftId = uuid;
  return gifts.create(data);
};

const getGiftById = (giftId: string) => {
  return gifts.findByPk(giftId);
};

const updateGiftById = (giftId: string, giftData: gift) => {
  return getGiftById(giftId)
    .then(gift => {
      if (!gift) {
        throw new Error(GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR);
      } else {
        return gifts.update(giftData, { where: { giftId } });
      }
    })
    .catch((err: Error) => {
      throw err;
    });
};

const destroyGiftById = (giftId: string) => {
  return getGiftById(giftId)
    .then(gift => {
      if (!gift) {
        throw new Error(GIFT_MESSAGE.GIFT_NOT_FOUND_ERROR);
      } else {
        return gift.destroy();
      }
    })
    .catch((err: Error) => {
      throw err;
    });
};

export { getAllGifts, addGift, getGiftById, updateGiftById, destroyGiftById };
