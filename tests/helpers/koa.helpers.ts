import config from 'config';

import { KoaApplication } from '../../src/adapters/driving/rest-api/koa/koa-application';
import { ConsoleLogger } from '../../src/adapters/driven/logger/console/console-logger';

export function createKoaApplication(gateway?: any): KoaApplication {
  return new KoaApplication({
    configuration: {
      port: config.get('server.port'),
      corsOrigin: config.get('server.cors.origin'),
    },
    logger: new ConsoleLogger(),
    ...gateway,
  });
}
