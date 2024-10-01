import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const adminSchema = Joi.object({
    userName: Joi.string().alphanum().min(5).max(20).lowercase().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).regex(/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[\w!@#$%^&*]+$/).required(),
    mobileNumber: Joi.number().integer().min(1000000000).max(9999999999).required(),
    userRole: Joi.string().required()
})

export const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
    const { error } = adminSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }
    next();
};
