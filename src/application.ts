import config from 'config';

import { KoaApplication } from './adapters/driving/rest-api/koa/koa-application';
import { Logger } from './core/gateways/logger.gateway';
import { ConsoleLogger } from './adapters/driven/logger/console/console-logger';

export class Application {
  private readonly koaApplication: KoaApplication;
  private readonly logger: Logger;

  constructor() {
    this.logger = new ConsoleLogger(config.get('logger.levels'));

    this.koaApplication = new KoaApplication({
      configuration: {
        port: config.get('server.port'),
        corsOrigin: config.get('server.cors.origin'),
        rootFolder: process.env.ROOT_PATH || config.get('application.rootFolder'),
      },
      logger: this.logger,
    });
  }

  async start(): Promise<void> {
    this.logger.info('Starting application ...');
    await this.koaApplication.listen();
    this.logger.info('Application started');
  }

  async stop(): Promise<void> {
    this.logger.info('Stopping application ...');
    await this.koaApplication.close();
    this.logger.info('Application stopped');
  }
}
