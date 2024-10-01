import joi from 'joi'
import validation  from 'express-joi-validation'

const Validation = validation.createValidator({});

const giftSchema = joi.object({
    giftId:joi.string().uuid().optional(),
    giftName:joi.string().required(),
    giftImageUrl:joi.string().required(),
    giftDetails:joi.string().required(),
    giftPrice:joi.number().required()
})

const giftValidation = Validation.body(giftSchema)

export {giftValidation}