// backend/server/data/mongoRepo.js
import { Service, User } from "./models/index.js";

const db = {
  services: {
    getAll: async () => {
      const items = await Service.find();
      return items;
    },
    getAllPaginated: async (query = {}, sort = {}, skip = 0, limit = 5) => {
      const items = await Service.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      return items;
    },
    countItems: async (query = {}) => {
      return await Service.countDocuments(query);
    },
    create: async ({ name, price, description, image }) => {
      const created = await Service.create({
        name,
        price,
        description,
        image,
      });
      return created;
    },
    findById: async (_id) => {
      const item = await Service.findById(_id);
      return item;
    },
    deleteById: async (_id) => {
      const item = await Service.findById(_id);
      if (item) {
        await Service.findByIdAndDelete(_id);
        return item;
      }
      return null;
    },
    updateById: async (_id, { name, price, description, image }) => {
      const item = await Service.findById(_id);
      if (item) {
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (price !== undefined) updateData.price = price;
        if (description !== undefined) updateData.description = description;
        if (image !== undefined) updateData.image = image;

        const updated = await Service.findOneAndUpdate(
          { _id },
          updateData,
          { new: true }
        );
        return updated;
      }
      return null;
    },
  },
  users: {
    findOne: async (username) => {
      return await User.findOne({ username }).lean();
    },
  },
};

export { db };