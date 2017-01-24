const { graphql, buildSchema } = require('graphql')

const data = {
  projects: [
    { id: 1, name: 'Drogia' },
    { id: 2, name: 'Projector' },
    { id: 3, name: 'Sranda' },
  ],
  tasks: [
    { id: 1, name: 'Task 1', projectId: 1 },
    { id: 2, name: 'Task 2', projectId: 1 },
    { id: 3, name: 'Task 3', projectId: 1 },
    { id: 4, name: 'Task 4', projectId: 2 },
    { id: 5, name: 'Task 5', projectId: 3 },
    { id: 6, name: 'Task 6', projectId: 2 },
    { id: 7, name: 'Task 7', projectId: 2 },
    { id: 8, name: 'Task 8', projectId: 3 },
  ],
}

const schema = buildSchema(/* GraphQL */`
  type Query {
    projects: [Project],
    tasks: [Task]
  }
  type Schema {
    query: Query
  }
  type Project {
    id: Int,
    name: String
  }
  type Task {
    id: Int,
    name: String,
    project: Project
  }
`)

const resolvers = {
  projects: () => data.projects,
  tasks: () => data.tasks.map(i => ({
    id: i.id,
    name: i.name,
    project: data.projects.filter(p => p.id === i.projectId)[0],
  })),
}

const query = `
query myFirstQuery {
  tasks {
    id,
    project {
      id,
      name
    }
  }
}`

graphql(schema, query, resolvers)
  .then(result => console.log(JSON.stringify(result)))
  .catch(e => console.log(e))
