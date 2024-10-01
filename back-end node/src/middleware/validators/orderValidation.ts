import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const orderSchema = Joi.object({
  orderId: Joi.string().optional(),
  orderName: Joi.string().required(),
  orderDescription: Joi.string().required(),
  themeModel: Joi.array().required(),
  giftModel: Joi.object().required(),
  orderDate: Joi.date().required(),
  orderPrice: Joi.number().positive().precision(2).required(),
  orderAddress: Joi.string().required(),
  orderPhone: Joi.number().integer().min(1000000000).max(9999999999).required(),
  orderEmail: Joi.string().email().required(),
  orderStatus: Joi.string().valid('confirmed','pending','processing','dispatched','delivered','cancelled').required(),
  orderUpdatedBy: Joi.string().required(),
});

export const orderValidation = (req: Request, res: Response, next: NextFunction) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
    });
  }
  next();
};

