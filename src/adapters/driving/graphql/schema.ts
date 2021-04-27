import { makeExecutableSchema } from 'graphql-tools';

import { types } from './types';
import { Query } from './types/query';
import { resolvers } from './resolvers';

const schemaDefinition = `
    schema {
        query: Query
    }
`;

const typeDefs = [schemaDefinition, Query, ...types];

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
