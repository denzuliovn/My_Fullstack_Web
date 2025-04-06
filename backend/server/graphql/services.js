export const typeDef = `
    type Service {
        _id: ID!
        name: String!
        price: Float!
        description: String
        image: String
    } 

    input ServiceInput {
        name: String!
        price: Float!
        description: String
        image: String
    }

    extend type Query {
        services: [Service]
        service(id: ID!): Service
    }

    extend type Mutation {
        deleteService(id: ID!): Boolean
        createService(input: ServiceInput!): Service
        updateService(id: ID!, input: ServiceInput!): Service
    }
`

export const resolvers = {
  Query: {
    services: async (parent, args, context, info) => {
      return await context.db.services.getAll()
    },
    service: async (parent, args, context, info) => {
      return await context.db.services.findById(args.id)
    },
  },
  Mutation: {
    deleteService: async (parent, args, context, info) => {
      return context.db.services.deleteById(args.id)
    },
    createService: async (parent, args, context, info) => {
      return await context.db.services.create(args.input)
    },
    updateService: async (parent, args, context, info) => {
      return context.db.services.updateById(args.id, args.input)
    },
  },
}
