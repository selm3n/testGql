import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from 'config';

import { importSchema } from'graphql-import'
import { resolvers } from'./graphql'
const typeDefs = importSchema('./src/graphql/schema.graphql')

const main = async () => {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${
      server.graphqlPath
    }`,
  ));
};

main().catch((error) => {
  console.error('Server failed to start', error);
});
