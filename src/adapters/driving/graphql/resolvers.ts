import { filesResolver } from './resolvers/files';

export const resolvers = {
  Query: {
    ...filesResolver,
  },
};
