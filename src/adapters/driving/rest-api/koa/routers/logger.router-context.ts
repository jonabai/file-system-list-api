import { Context } from 'koa';
import { RouterContext } from 'koa-router';

import { Logger } from '../../../../../core/gateways/logger.gateway';

export type LoggerRouterContext = RouterContext<LoggerRouterContextState>;

export interface LoggerRouterContextState extends Context {
  logger: Logger;
  correlationID: string;
  startDate: number;
}
