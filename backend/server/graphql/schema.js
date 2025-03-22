import { createSchema } from 'graphql-yoga'
import _ from 'lodash'
import { typeDef as upload, resolvers as uploadResolvers } from './upload.js'
import { typeDef as hello, resolvers as helloResolvers } from './hello.js'
import { typeDef as salute, resolvers as saluteResolvers } from './salute.js'
import {
  typeDef as categories,
  resolvers as categoriesResolvers,
} from './categories.js'
import {
  typeDef as login,
  resolvers as loginResolvers,
} from './authentication.js'

const query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _emptyAction: String
  }  
`
const typeDefs = [query, hello, salute, categories, login, upload]
const resolvers = _.merge(
  helloResolvers,
  saluteResolvers,
  categoriesResolvers,
  loginResolvers,
  uploadResolvers,
)

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
})
