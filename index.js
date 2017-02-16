const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const db = require('./src/sqlite-service')

const schema = buildSchema(/* GraphQL */`
  type Query {
    project(id: Int): Project
    projects: [Project]
    tasks: [Task]
    taskStates: [TaskState]
  }
  type Schema {
    query: Query
    mutation: Mutation
  }
  type Mutation {
    setProject(name: String): Boolean
    setTask(task: TaskInput): Task
  }

  type Project {
    id: Int
    name: String
  }
  type TaskState {
    id: Int
    name: String
  }
  type Task {
    id: Int
    name: String
    project_id: Int
    project: Project
    state_id: Int
    state: TaskState
    priority: Int
  }
  input TaskInput {
    id: Int
    name: String
    project_id: Int
    state_id: Int
    priority: Int
  }
`)

const resolvers = {
  projects: () => db.getRecords('project'),
  tasks: () => {
    const tasks = db.getRecords('task')
    console.log(tasks)
    return tasks.map((i) => {
      return Object.assign(i, {
        project: resolvers.project({ id: i.project_id }),
        state: resolvers.taskState({ id: i.state_id }),
      })
    })
  },
  taskStates: () => db.getRecords('task_state'),
  taskState: (args) => {
    console.log('state', args)
    return db.getRecordById('task_state', args.id)
  },
  project: (args) => {
    console.log('pr', args)
    return db.getRecordById('project', args.id)
  },
  setProject: ({ name }) => {
    console.log('setting project', name)
    db.saveRecord('project', { name })
      .then(i => console.log(i))
    return true
  },
  setTask: ({ task }) => {
    console.log('saving task', task)
    return db.saveRecord('task', task)
  },
}

const app = express()
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: false,
}))

app.listen(4000, () => console.log('GraphQL server running at port 4000'))
