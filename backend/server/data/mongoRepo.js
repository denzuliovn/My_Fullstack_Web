import { Category, User } from './models/index.js'

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find()
      return items
    },
    create: async ({ name, price, description }) => {
      const created = await Category.create({
        name: name,
        price: price,
        description: description,
        image: image,
      })
      return created
    },
    findById: async (_id) => {
      const item = await Category.findById(_id)
      return item
    },
    deleteById: async (_id) => {
      const item = await Category.findById(_id)
      if (item) {
        await Category.findByIdAndDelete(_id)
        return item
      }
      return null
    },
    updateById: async (_id, { name, price, description, image }) => {
      var item = await Category.findById(_id)
      if (item) {
        item = await Category.findOneAndUpdate(
          { _id: _id },
          { name: name, price: price, description: description, image: image },
          { new: true },
        )
        return item
      }
      return null
    },
  },
  users: {
    findOne: async (username) => {
      return await User.findOne({ username }).lean()
    },
  },
}

export { db }
