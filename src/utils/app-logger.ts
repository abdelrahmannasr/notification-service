import * as LOGGER from 'logger';
import { LoggerLevels, StageType } from '../enum';
import { ENV } from '../common/env-variables';
import * as  httpContext from 'express-http-context';
import { Constants } from '../common';

export class AppLogger {
  public static logger = LOGGER.createLogger('systemLogs.log');
  public static level: LoggerLevels;

  public static debug(...args: any) {
    const currentSession = httpContext.get(Constants.CURRENT_SESSION);
    this.checkLogLevel();
    this.logger.debug(currentSession, args);
    if (this.level === LoggerLevels.Debug) {
      console.debug('\u001b[' + 32 + 'm' + `[DEBUG] >>>>> ${currentSession ? `[Session ID: ${currentSession}]` : ''}` + '\u001b[0m', args, '\n');
    }
  }

  public static info(...args: any) {
    const currentSession = httpContext.get(Constants.CURRENT_SESSION);
    this.checkLogLevel();
    this.logger.info(currentSession, args);
    if (this.level === LoggerLevels.Debug) {
      console.info('\u001b[' + 93 + 'm' + `[INFO] >>>>> ${currentSession ? `[Session ID: ${currentSession}]` : ''}` + '\u001b[0m', args, '\n');
    }
  }

  public static warn(...args: any) {
    const currentSession = httpContext.get(Constants.CURRENT_SESSION);
    this.checkLogLevel();
    this.logger.warn(currentSession, args);
    if (this.level === LoggerLevels.Debug) {
      console.warn('\u001b[' + 93 + 'm' + `[WARNING] >>>>> ${currentSession ? `[Session ID: ${currentSession}]` : ''}` + '\u001b[0m', args, '\n');
    }
  }

  public static error(...args: any) {
    const currentSession = httpContext.get(Constants.CURRENT_SESSION);
    this.checkLogLevel();
    this.logger.error(currentSession, args);
    if (this.level === LoggerLevels.Debug) {
      console.error('\u001b[' + 31 + 'm' + `[ERROR] >>>>> ${currentSession ? `[Session ID: ${currentSession}]` : ''}` + '\u001b[0m', args, '\n');
    }
  }

  public static fatal(...args: any) {
    const currentSession = httpContext.get(Constants.CURRENT_SESSION);
    this.checkLogLevel();
    this.logger.fatal(currentSession, args);
    if (this.level === LoggerLevels.Debug) {
      console.error('\u001b[' + 31 + 'm' + `[FATAL][ERROR] >>>>> ${currentSession ? `[Session ID: ${currentSession}]` : ''}` + '\u001b[0m', args, '\n');
    }
  }

  public static checkLogLevel() {
    if (!this.level) {
      if (ENV.ENABLE_LOGGING == 'true' || ENV.STAGE_TYPE == StageType.Development) {
        this.level = LoggerLevels.Debug;
      } else if (ENV.STAGE_TYPE == StageType.Test) {
        this.level = LoggerLevels.Info;
      } else if (ENV.STAGE_TYPE == StageType.Stage) {
        this.level = LoggerLevels.Info;
      } else if (ENV.STAGE_TYPE == StageType.Production) {
        this.level = LoggerLevels.Error;
      }
      this.logger.setLevel(this.level);
    }
  }
}
