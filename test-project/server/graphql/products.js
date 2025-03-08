export const typeDef = `type Product {
    id: Int!
    name: String!
    price: Int!
    category: Category! #Relationship: Each Product belongs to a Category
  }
  
  input ProductInput {
    name: String
    price: Int
    categoryId: Int #The ID of the Category that the Product belongs to
  }
  
  extend type Query {
    products: [Product]
    product(id: Int!): Product
  }
  
  extend type Mutation {
    createProduct(input: ProductInput!): Product
    deleteProduct(id: Int!): Int
    updateProduct(id: Int!, input: ProductInput!): Product
  }
  
  type Category {
    id: Int!
    name: String!
    products: [Product] # Relationship: Each Category has multiple Products
  }
`
export const resolvers = {
  Query: {
    products: (parent, args, context) => {
      return context.db.products.getAll()
    },
    product: (parent, { id }, context) => {
      return context.db.products.findById(id)
    },
  },
  Mutation: {
    createProduct: (parent, { input }, context) => {
      return context.db.products.create(input)
    },
    deleteProduct: (parent, { id }, context) => {
      return context.db.products.deleteById(id)
    },
    updateProduct: (parent, { id, input }, context) => {
      return context.db.products.updateById(id, input)
    },
  },
  Product: {
    category: (parent, args, context) => {
      return context.db.categories.findById(parent.categoryId)
    },
  },
  Category: {
    products: (parent, args, context) => {
      return context.db.products.findByCategoryId(parent.id)
    },
  },
}
