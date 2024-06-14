"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    db: process.env.DB_URL,
    default_password: process.env.DEFAULT_PASSWORD,
    bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES,
};
