import { LogFormatter } from '../log-formatter';
import { LogLevel } from '../log-level';
import { Logger } from '../../../../core/gateways/logger.gateway';

export class ConsoleLogger implements Logger {
  private readonly logFormatter: LogFormatter;
  private readonly logger: Console;
  private readonly prefixes: string[];

  constructor(private readonly logLevelsEnabled = [LogLevel.ERROR, LogLevel.INFO, LogLevel.WARN, LogLevel.DEBUG]) {
    this.logFormatter = new LogFormatter();
    this.logger = console;
    this.prefixes = [];
  }

  debug(message: string): void {
    if (this.logLevelsEnabled.includes(LogLevel.DEBUG)) {
      this.logger.log(this.logFormatter.formatMessage(['DEBUG', ...this.prefixes], message));
    }
  }

  error(message: string): void {
    if (this.logLevelsEnabled.includes(LogLevel.ERROR)) {
      this.logger.log(this.logFormatter.formatMessage(['ERROR', ...this.prefixes], message));
    }
  }

  info(message: string): void {
    if (this.logLevelsEnabled.includes(LogLevel.INFO)) {
      this.logger.log(this.logFormatter.formatMessage(['INFO', ...this.prefixes], message));
    }
  }

  warn(message: string): void {
    if (this.logLevelsEnabled.includes(LogLevel.WARN)) {
      this.logger.log(this.logFormatter.formatMessage(['WARN', ...this.prefixes], message));
    }
  }
}
