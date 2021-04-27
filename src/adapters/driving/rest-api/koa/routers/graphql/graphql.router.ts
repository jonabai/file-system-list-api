import Router, { IMiddleware } from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'apollo-server-koa';

import { schema } from '../../../../graphql/schema';
import { Context } from '../../../../graphql/context';

export class GraphQlRouter {
  routes(context: Context): IMiddleware {
    const router = new Router();

    // API entrypoint
    const apiEntrypointPath = '/graphql';
    const graphQlOpts = graphqlKoa({
      schema,
      context,
    });

    router.get(apiEntrypointPath, graphQlOpts);
    router.post(apiEntrypointPath, bodyParser(), graphQlOpts);
    // GraphiQL entrypoint
    router.get('/graphiql', graphiqlKoa({ endpointURL: apiEntrypointPath }));

    return router.routes();
  }
}
