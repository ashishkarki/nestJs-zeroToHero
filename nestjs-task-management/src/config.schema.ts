import * as Joi from '@hapi/joi';

export const configValidationSchema = Joi.object({
  PORT: Joi.number().default(3000),
  STAGE: Joi.string().required(),
  DB_HOST_NAME: Joi.string().required(),
  DB_PORT_NUM: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE_NAME: Joi.string().required(),
  JWT_MODULE_SECRET: Joi.string().required(),
});
