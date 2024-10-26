import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import * as process from 'process';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [path.join(__dirname, '../../modules/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, '../../core/**/migrations/*{.ts,.js}')],
  autoLoadEntities: true,
  logging: true,
};

export default registerAs('typeorm', () => config);

export const connectionSource = new DataSource(config as DataSourceOptions);
