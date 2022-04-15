import { createLogger, format, transports, addColors } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
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
    new DailyRotateFile({
      filename: 'combined-%DATE%.log',
      dirname: logDir,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '5'
    })
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'exceptions-%DATE%.log',
      dirname: logDir,
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: false,
      maxSize: '20m',
      maxFiles: '2'
    })
  ]
});
addColors(logLevels.colors);

export default logger;
