import dotenv from "dotenv";
dotenv.config();
export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  db: process.env.DB_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_token: process.env.JWT_ACCESS_TOKEN,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES,
};
