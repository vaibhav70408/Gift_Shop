import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validationMiddleware = createValidator({});

export const userSchema = Joi.object({
  userName: Joi.string().alphanum().min(5).max(20).lowercase().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/).required(),
    mobileNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    userRole:Joi.string().required()
})

const validateUser = validationMiddleware.body(userSchema);
export default validateUser;