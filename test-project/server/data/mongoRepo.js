import { Category } from './models/index.js'

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find()
      return items
    },
    create: async ({ name }) => {
      const created = await Category.create({
        name: name,
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
    updateById: async (_id, { name }) => {
      var item = await Category.findById(_id)
      if (item) {
        item = await Category.findOneAndUpdate(
          { _id: _id },
          { name: name },
          { new: true },
        )
        return item
      }
      return null
    },
  },
}

export { db }
