import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { LOGIN_ERROR_MESSAGE } from '../../constants/loginErrorMessages';
const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/;

const adminSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(passwordRegex).required()
})

export const validateLoginAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: LOGIN_ERROR_MESSAGE.INVALID_INPUT
        });
    }
    next();
};

