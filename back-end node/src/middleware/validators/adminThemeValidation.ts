import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

const validationMiddleware = createValidator({});

export const themeSchema = Joi.object({
  themeId: Joi.string().uuid().optional(),
  themeName: Joi.string().required(),
  themeDetails: Joi.string().required(),
  themePrice: Joi.number().required(),
});

const validateTheme = validationMiddleware.body(themeSchema);

export default validateTheme;
