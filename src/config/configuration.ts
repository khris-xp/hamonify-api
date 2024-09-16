import * as Joi from 'joi';
import { Environment } from 'src/shared/enums';

export const configuration = Joi.object({
  PORT: Joi.number().required(),
  NODE_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.DEVELOPMENT),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRATION: Joi.string().required(),
  JWT_REFRESH_EXPIRATION: Joi.string().required(),
  IS_DEVELOPMENT: Joi.boolean().when('NODE_ENV', {
    is: Joi.equal(Environment.DEVELOPMENT),
    then: Joi.boolean().default(true),
    otherwise: Joi.boolean().default(false),
  }),
});
