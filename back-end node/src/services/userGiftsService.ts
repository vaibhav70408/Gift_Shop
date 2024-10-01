import { Session } from 'express-session';
import { gifts } from '../model/gifts';

interface CustomSession extends Session {
  cart?: {
    items: any[];
  };
}

const selectedGift = (session: CustomSession, data: any) => {
  if (session.cart) {
    session.cart.items.push(data);
  } else {
    session.cart = {
      items: [data],
    };
  }
};
const getAllGifts = () => {
  return gifts.findAll();
};

export  { selectedGift, getAllGifts};
