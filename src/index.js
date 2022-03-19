import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

const { DB_PROTOCOL, DB_HOST, DB_NAME, DB_USER, DB_PASS } = process.env;
const uri = `${DB_PROTOCOL}://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`;
const app = express();

try {
  await mongoose.connect(uri);

  const { Schema } = mongoose;
  const taskSchema = new Schema({
    title: String,
    description: String,
    status: { type: String, default: 'TO_DO' },
  });
  const Task = mongoose.model('Task', taskSchema);

  const schema = buildSchema(`
  enum TaskStatus {
    TO_DO
    IN_PROGRESS
    DONE
  }

  input TaskInput {
    title: String!
    description: String
    status: TaskStatus
  }

  type Task {
    id: ID!
    title: String
    description: String
    status: TaskStatus
  }

  type Query {
    tasks: [Task!]!
  }

  type Mutation {
    addTask(task: TaskInput): Task
    updateTask(id: ID, task: TaskInput): Task
    deleteTask(id: ID): Task
  }
`);
  const root = {
    tasks: async () => await Task.find(),
    addTask: async ({ task }) => await new Task(task).save(),
    updateTask: async ({ id, task }) => await Task.findByIdAndUpdate(id, task, { new: true }),
    deleteTask: async ({ id }) => await Task.findByIdAndDelete(id),
  };

  app.use('/graphql', graphqlHTTP({ schema, rootValue: root, context: { Task }, graphiql: true }));
  app.listen(4000);

  console.log('Running a GraphQL API server at http://localhost:4000/graphql');
} catch (error) {
  console.log(error);
}
