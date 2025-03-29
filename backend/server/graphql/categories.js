export const typeDef = `
    type Category {
        _id: ID!
        name: String!
        price: Float!
        description: String
        image: String
    } 

    input CategoryInput {
        name: String!
        price: Float!
        description: String
        image: String
    }

    extend type Query {
        categories: [Category]
        category(id: ID!): Category
    }

    extend type Mutation {
        deleteCategory(id: ID!): Boolean
        createCategory(input: CategoryInput!): Category
        updateCategory(id: ID!, input: CategoryInput!): Category
    }
`

export const resolvers = {
  Query: {
    categories: async (parent, args, context, info) => {
      return await context.db.categories.getAll()
    },
    category: async (parent, args, context, info) => {
      return await context.db.categories.findById(args.id)
    },
  },
  Mutation: {
    deleteCategory: async (parent, args, context, info) => {
      return context.db.categories.deleteById(args.id)
    },
    createCategory: async (parent, args, context, info) => {
      return await context.db.categories.create(args.input)
    },
    updateCategory: async (parent, args, context, info) => {
      return context.db.categories.updateById(args.id, args.input)
    },
  },
}
