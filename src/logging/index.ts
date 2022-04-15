import { createLogger, format, transports, addColors } from 'winston';
import fs from 'fs';

const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green'
  }
};
const logger = createLogger({
  level: 'info',
  levels: logLevels.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  defaultMeta: { service: 'cueb-play' },
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(
        format.colorize(),
        format.json()
      )
    }),
    new transports.File({ 
      filename: `./${logDir}/combined.log`,
      level: 'silly',
      format: format.json()
    })
  ],
  exceptionHandlers: [
    new transports.File({ 
      filename: `./${logDir}/exceptions.log`
    })
  ]
});
addColors(logLevels.colors);

logger.log({
  level: 'info',
  message: 'Logging initialized',
});

export default logger;
