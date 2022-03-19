import { buildSchema } from 'graphql';

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

export default schema;
