export default () => ({
  environment: process.env.NODE_ENV,
  broker: {
    host: process.env.BROKER_HOST,
    port: process.env.BROKER_PORT
  },
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    schema: process.env.DATABASE_SCHEMA,
  },
  jwt: {
    secret: process.env.JWT_KEY,
    expiresIn: process.env.JWT_EXPIRESIN,
    algorithm: process.env.JWT_ALGORITHM,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  aws: {
    id: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucket: process.env.AWS_BUCKET
  },
  global: {
    port: process.env.GLOBAL_PORT,
    numberRequestPerSlot: process.env.GLOBAL_NUMBER_REQUEST_PER_SLOT,
    slotTime: process.env.GLOBAL_SLOT_TIME,
    timeout: process.env.GLOBAL_TIMEOUT,
    temp: process.env.GLOBAL_TEMP_DEST,
    domain: process.env.GLOBAL_DOMAIN,
    frontend: process.env.GLOBAL_FRONTEND,
  },
  cloudinary: {
    domain: process.env.CLOUDINARY_DOMAIN,
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_KEY,
    apiSecret: process.env.CLOUDINARY_SECRET,
  },
  password: {
    algorithm: process.env.PASSWORD_HASH_ALGORITHM,
    digest: process.env.PASSWORD_HASH_DIGEST,
  },
  email: {
    type: process.env.EMAIL_TYPE,
    sender: process.env.EMAIL_SENDER,
    password: process.env.EMAIL_PASSWORD,
  },
});
