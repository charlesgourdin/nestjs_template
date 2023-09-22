import * as Joi from '@hapi/joi';

export default () => ({
  validationSchema: Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test'),
    PORT: Joi.number().default(3000),
    THROTTLE_TTL: Joi.string().required(),
    THROTTLE_LIMIT: Joi.string().required(),
    JWT_SIGNUP_TOKEN_SECRET: Joi.string().required(),
    JWT_REFRESH_SECRET: Joi.string().required(),
    JWT_ACCESS_SECRET: Joi.string().required(),
    EMAIL_HOST: Joi.string().required(),
    EMAIL_ADDRESS: Joi.string().required(),
    EMAIL_USER: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),
    EMAIL_PORT: Joi.number().required(),
    EMAIL_CONFIRMATION_URL: Joi.string().required(),
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string().required(),
    // ...
  }),
});
