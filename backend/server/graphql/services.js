// backend/server/graphql/services.js
export const typeDef = `
    type Service {
        _id: ID!
        name: String!
        price: Float!
        description: String
        image: String
    } 

    type ServiceConnection {
        items: [Service!]!
        totalItems: Int!
        currentPage: Int!
        totalPages: Int!
        itemsPerPage: Int!
    }

    input ServiceInput {
        name: String!
        price: Float!
        description: String
        image: String
    }

    input ManagerServiceInput {
        name: String!
        description: String
    }

    extend type Query {
        services(
            page: Int
            itemsPerPage: Int
            sortBy: String
            sortOrder: String
            priceMin: Float
            priceMax: Float
            search: String
        ): ServiceConnection
        service(id: ID!): Service
    }

    extend type Mutation {
        deleteService(id: ID!): Boolean
        createService(input: ServiceInput!): Service
        updateService(id: ID!, input: ServiceInput!): Service
        updateServiceByManager(id: ID!, input: ManagerServiceInput!): Service
    }
`;

export const resolvers = {
  Query: {
    services: async (parent, { page = 1, itemsPerPage = 5, sortBy, sortOrder, priceMin, priceMax, search }, context) => {
      let query = {};
      let sort = {};

      // Filtering by price range
      if (priceMin !== undefined || priceMax !== undefined) {
        query.price = {};
        if (priceMin !== undefined) query.price.$gte = priceMin;
        if (priceMax !== undefined) query.price.$lte = priceMax;
      }

      // Search in name or description (case-insensitive)
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
        ];
      }

      // Sorting
      if (sortBy && sortOrder) {
        sort[sortBy] = sortOrder === "asc" ? 1 : -1;
      }

      // Pagination
      const totalItems = await context.db.services.countItems(query);
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const skip = (page - 1) * itemsPerPage;

      const items = await context.db.services.getAllPaginated(query, sort, skip, itemsPerPage);

      return {
        items,
        totalItems,
        currentPage: page,
        totalPages,
        itemsPerPage,
      };
    },
    service: async (parent, { id }, context) => {
      return await context.db.services.findById(id);
    },
  },
  Mutation: {
    deleteService: async (parent, { id }, context) => {
      const result = await context.db.services.deleteById(id);
      return !!result;
    },
    createService: async (parent, { input }, context) => {
      return await context.db.services.create(input);
    },
    updateService: async (parent, { id, input }, context) => {
      return await context.db.services.updateById(id, input);
    },
    updateServiceByManager: async (parent, { id, input }, context) => {
      const { name, description } = input;
      return await context.db.services.updateById(id, { name, description });
    },
  },
};