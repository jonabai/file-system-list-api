import { Server } from 'http';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { requestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { HealthRouter } from './routers/health/health.router';
import { Logger } from '../../../../core/gateways/logger.gateway';
import { GraphQlRouter } from './routers/graphql/graphql.router';
import { GetFilesInAFolderUseCase } from '../../../../core/use-cases/get-files-in-a-folder/get-files-in-a-folder.use-case';
import { LocalFileSystemAdapter } from '../../../driven/file-system/local-file-system/local-file-system.adapter';

export interface KoaApplicationConfiguration {
  corsOrigin: string;
  port: number;
  rootFolder: string;
}

interface KoaApplicationGateway {
  configuration: KoaApplicationConfiguration;
  logger: Logger;
}

export class KoaApplication {
  private koa: Koa;
  private server!: Server;

  constructor(private gateway: KoaApplicationGateway) {
    this.koa = new Koa();

    this.koa.use(requestLoggerMiddleware(this.gateway.logger));
    this.koa.use(bodyParser({ enableTypes: ['json', 'text'] }));

    const apiPrefix = '/api';
    this.koa.use(new HealthRouter().routes(apiPrefix));
    this.koa.use(
      new GraphQlRouter().routes({
        dataLoaders: {
          files: new GetFilesInAFolderUseCase({
            fileSystemAdapter: new LocalFileSystemAdapter(this.gateway.configuration.rootFolder),
            logger: this.gateway.logger,
          }),
        },
      }),
    );
  }

  listen(): Promise<void> {
    return new Promise((resolve) => {
      this.server = this.koa.listen(this.gateway.configuration.port, () => {
        this.gateway.logger.info(`Server is listening on ${this.gateway.configuration.port}`);
        return resolve();
      });
    });
  }

  async close(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close(() => {
        this.gateway.logger.debug('Server stopped');
        return resolve();
      });
    });
  }
}
