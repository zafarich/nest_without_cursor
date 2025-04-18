import * as Joi from 'joi';

export const environmentValidationSchema: Joi.ObjectSchema = Joi.object({
  PORT: Joi.number().default(3000),
  NODE_ENV: Joi.string().valid('development', 'production'),
});
