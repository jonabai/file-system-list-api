import moment from 'moment';

export class LogFormatter {
  formatMessage(prefixes: string[], message: string): { message: string } {
    const now = moment().utc().format('YYYY-MM-DDTHH:mm:ss.ms\\Z');

    let formattedMessage = `${now}`;
    prefixes.map((prefix) => {
      formattedMessage = `${formattedMessage} [${prefix}]`;
    });
    formattedMessage = `${formattedMessage} ${message}`;

    return { message: formattedMessage };
  }
}
