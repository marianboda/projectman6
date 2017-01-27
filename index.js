const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const db = require('./src/sqlite-service')

const schema = buildSchema(/* GraphQL */`
  type Query {
    project(id: Int): Project,
    projects: [Project],
    tasks: [Task],
    taskStates: [TaskState]
  }
  type Schema {
    query: Query
  }
  type Project {
    id: Int,
    name: String
  }
  type TaskState {
    id: Int,
    name: String
  }
  type Task {
    id: Int,
    name: String,
    project: Project,
    state: TaskState
  }
`)

const resolvers = {
  projects: () => db.getRecords('project'),
  tasks: () => {
    const tasks = db.getRecords('task')
    console.log(tasks)
    return tasks.map((i) => {
      const pId = i.project_id
      console.log(pId)
      return Object.assign(i, { project: resolvers.project({ id: pId }) })
    })
  },
  taskStates: () => db.getRecords('task_state'),
  project: (args) => {
    console.log('pr', args)
    return db.getRecordById('project', args.id)
  },
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: false,
}))

app.listen(4000, () => console.log('GraphQL server running at port 4000'))
