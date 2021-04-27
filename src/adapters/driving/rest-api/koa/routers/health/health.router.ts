import Router, { IMiddleware } from 'koa-router';
import { Context } from 'koa';

export class HealthRouter {
  routes(prefix?: string): IMiddleware {
    const router = new Router({ prefix });

    router.get('/health', (ctx: Context) => {
      ctx.body = { status: 'Alive and Kicking' };
    });

    return router.routes();
  }
}
