import { Sequelize } from "sequelize";
import { databaseConnection } from "./connector";
import { Setting } from "./models/setting";
import path from "path";

const openDatabase = async (path: string): Promise<Sequelize> => {
  const database = databaseConnection(path);
  await database.authenticate();
  Setting(database);
  await database.sync({ alter: true }); //TODO move this functionality to the migrator. For now, this will check the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
  return database;
}

export const openFile = async (filePath: string): Promise<Sequelize> => {
  if (path.extname(filePath) !== ".sqlite") {
    throw new Error("The file path must be a valid filetype.");
  }
  try {
    const database = await openDatabase(filePath);
    return database;
  } catch {
    throw new Error("Could not open database");
  }
}