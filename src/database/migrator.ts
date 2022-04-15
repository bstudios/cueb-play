/***
 * Migrations are a planned feature * 
 */
/*
import { databaseConnection } from './connector';
import { Umzug, SequelizeStorage } from 'umzug';

const databaseConnector = databaseConnection("test");

export const migrator  = (path: string) => {
  const migrator = new Umzug({
    migrations: {
      glob: ['migrations/*.ts', { cwd: __dirname }],
    },
    context: databaseConnector,
    storage: new SequelizeStorage({
      sequelize: databaseConnector,
    }),
    logger: console,
  });
  return migrator;
}
*/