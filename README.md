# Task API

A simple CRUD made with GraphQL for learning.

## Usage

The API uses MongoDB to store/retrieve data.

You need an .env file with the following variables to connect with your database.

```bash
DB_PROTOCOL="mongodb"
DB_HOST="localhost:27017"
DB_NAME="database"
DB_USER="user"
DB_PASS="pass"
```

As a CRUD there are four operations to handle data.

#### Get tasks

```graphql
query {
  tasks {
    id
    title
    description
    status
  }
}
```

#### Add task

```graphql
mutation {
  addTask(task: { title: "lorem ipsum", description: "dolor sit amet", status: TO_DO }) {
    id
    title
    description
    status
  }
}
```

#### Update task

```graphql
mutation {
  updateTask(id: "621fabdf2ebdbc4a2f237fd0", task: { status: IN_PROGRESS }) {
    id
    title
    description
    status
  }
}
```

#### Delete task

```graphql
mutation {
  deleteTask(id: "621fabdf2ebdbc4a2f237fd0") {
    id
    title
    description
    status
  }
}
```
