import "reflect-metadata"
import source from "../../ormconfig";
import logger from "../logging";

const initialize = async (filePath: string): Promise<boolean> => {
  return source.initialize()
    .then(() => {
      logger.info("Connected to database");
      return Promise.resolve(true);
    })
    .catch((error) => {
      logger.error(error);
      return Promise.resolve(false);
    });
}

export default initialize;