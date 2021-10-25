import { JoiValidationPipe } from "src/common/joi-validation.pipe";
import * as Joi from 'joi';

export class PersonValidationPipe extends JoiValidationPipe {
    public buildSchema(): Joi.Schema {
        return Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            age: Joi.number().required(),
            gender: Joi.string().required(),
            addresses: Joi.array().items(Joi.object().keys({
                type: Joi.string().required(),
                address1: Joi.string().required(),
                address2: Joi.string(),
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                country: Joi.string().required(),
                postalCode: Joi.string().required()
            })).required(),
            emails: Joi.array().items(Joi.object().keys({
                type: Joi.string().required(),
                value: Joi.string().email().required()
            })).required(),
            phones: Joi.array().items(Joi.object().keys({
                type: Joi.string().required(),
                code: Joi.number().required(),
                number: Joi.number().required()
            })).required()
        });
    }
}

