import { ConnectionOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const typeOrmConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'test',
  database: 'campus-buurt',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
};

module.exports = {
  ...typeOrmConfig,
  seeds: [__dirname + '/../database/seeds/*.seed.{js,ts}'],
  factories: [__dirname + '/../database/factories/*.factory.{js,ts}'],
};
