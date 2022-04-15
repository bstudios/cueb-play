require('ts-node/register')
import { Sequelize } from 'sequelize';
import logger from '../logging';

export const databaseConnection = (path: string) => {
  const database = new Sequelize({
    dialect: 'sqlite',
    storage: path,
    logging: (...msg) => logger.debug(msg),
  });

  return database;
}