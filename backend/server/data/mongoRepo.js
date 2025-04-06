import { Service, User } from './models/index.js'

const db = {
  services: {
    getAll: async () => {
      const items = await Service.find()
      return items
    },
    create: async ({ name, price, description }) => {
      const created = await Service.create({
        name: name,
        price: price,
        description: description,
        image: image,
      })
      return created
    },
    findById: async (_id) => {
      const item = await Service.findById(_id)
      return item
    },
    deleteById: async (_id) => {
      const item = await Service.findById(_id)
      if (item) {
        await Service.findByIdAndDelete(_id)
        return item
      }
      return null
    },
    updateById: async (_id, { name, price, description, image }) => {
      var item = await Service.findById(_id)
      if (item) {
        item = await Service.findOneAndUpdate(
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