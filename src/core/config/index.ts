import { IConfig } from './interface/config.interface';
import * as process from 'process';

export const config = (): IConfig => ({
  port: parseInt(process.env.PORT, 10) || 80,
  accessSecret: process.env.JWT_SECRET_KEY,
  root: {
    name: process.env.ROOT_USER,
    email: process.env.ROOT_EMAIL,
    password: process.env.ROOT_PASSWORD,
  },
  cache: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    ttl: parseInt(process.env.CACHE_TTL, 10) || 300,
  },
});
