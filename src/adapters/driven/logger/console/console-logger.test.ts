import moment from 'moment';
import timekeeper from 'timekeeper';

import { ConsoleLogger } from './console-logger';
import { LogLevel } from '../log-level';

describe('Console Logger', () => {
  const now = moment().utc();
  const nowFormatted = now.format('YYYY-MM-DDTHH:mm:ss.ms\\Z');
  let consoleLogger: ConsoleLogger;
  let oldConsoleLog: any;
  let stdout: string[];

  beforeEach(() => {
    timekeeper.freeze(now.toDate());
    oldConsoleLog = console.log;
    stdout = [];

    console.log = (message: string): void => {
      stdout.push(message);
    };
  });

  afterEach(() => {
    console.log = oldConsoleLog;
    timekeeper.reset();
  });

  describe('debug', () => {
    describe('when LogLevel DEBUG is enable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([LogLevel.DEBUG]);
      });

      it('should log debug message', () => {
        consoleLogger.debug('debug message');
        expectMessageToBePrinted(`${nowFormatted} [DEBUG] debug message`);
      });
    });

    describe('when LogLevel DEBUG is disable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([]);
      });

      it('should not log anything', () => {
        consoleLogger.debug('debug message');
        expectNoMessagesToBePrinted();
      });
    });
  });

  describe('error', () => {
    describe('when LogLevel ERROR is enable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([LogLevel.ERROR]);
      });

      it('should log error message', () => {
        consoleLogger.error('error message');
        expectMessageToBePrinted(`${nowFormatted} [ERROR] error message`);
      });
    });

    describe('when LogLevel ERROR is disable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([]);
      });

      it('should not log anything', () => {
        consoleLogger.error('error message');
        expectNoMessagesToBePrinted();
      });
    });
  });

  describe('info', () => {
    describe('when LogLevel INFO is enable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([LogLevel.INFO]);
      });

      it('should log info message', () => {
        consoleLogger.info('info message');
        expectMessageToBePrinted(`${nowFormatted} [INFO] info message`);
      });
    });

    describe('when LogLevel INFO is disable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([]);
      });

      it('should log info message', () => {
        consoleLogger.info('info message');
        expectNoMessagesToBePrinted();
      });
    });
  });

  describe('warn', () => {
    describe('when LogLevel WARN is enable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([LogLevel.WARN]);
      });

      it('should log warn message', () => {
        consoleLogger.warn('warn message');
        expectMessageToBePrinted(`${nowFormatted} [WARN] warn message`);
      });
    });

    describe('when LogLevel WARN is disable', () => {
      beforeEach(() => {
        consoleLogger = new ConsoleLogger([]);
      });

      it('should log warn message', () => {
        consoleLogger.warn('warn message');
        expectNoMessagesToBePrinted();
      });
    });
  });

  function expectMessageToBePrinted(message: string): void {
    expect(stdout).toEqual([{ message }]);
  }

  function expectNoMessagesToBePrinted(): void {
    expect(stdout).toEqual([]);
  }
});
