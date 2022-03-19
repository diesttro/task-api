import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { graphqlHTTP } from 'express-graphql';
import schema from './schemas/graphql';
import root from './resolvers';
import { Task } from './models';

const { DB_PROTOCOL, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
const uri = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
const app = express();

try {
  await mongoose.connect(uri);

  app.use('/graphql', graphqlHTTP({ schema, rootValue: root, context: { Task }, graphiql: true }));
  app.listen(4000);

  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
} catch (error) {
  console.log(error);
}
