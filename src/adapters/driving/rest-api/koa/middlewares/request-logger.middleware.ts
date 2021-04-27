import { v4 } from 'uuid';

import { LoggerRouterContext } from '../routers/logger.router-context';
import { Logger } from '../../../../../core/gateways/logger.gateway';

export function requestLoggerMiddleware(logger: Logger) {
  return async (ctx: LoggerRouterContext, next: any): Promise<void> => {
    ctx.state.startDate = Date.now();

    ctx.state.correlationID = v4();
    ctx.state.logger = logger;

    ctx.state.logger.info(`Request on ${ctx.request.method} ${ctx.request.url} from ${ctx.request.ip}`);

    ctx.response.set('correlationID', ctx.state.correlationID);

    await next();

    const difMillis = Date.now() - ctx.state.startDate;
    ctx.state.logger.info(`End request on ${ctx.request.method} ${ctx.request.url} (status: ${ctx.response.status}) took ${difMillis}ms`);
  };
}
