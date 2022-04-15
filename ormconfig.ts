import { DataSource } from 'typeorm';

const source = new DataSource({
  type: "better-sqlite3",
  database: "database.sqlite3",
  synchronize: false,
  migrationsRun: true,
  entities: [
     "src/database/model/**/*{.js,.ts}"
  ],
  migrations: [
     "src/database/migrations/**/*{.js,.ts}"
  ],
  subscribers: [
     "src/database/subscriber/**/*{.js,.ts}"
  ]
});

export default source