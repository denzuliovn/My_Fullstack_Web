import mongoose from 'mongoose'
let Schema = mongoose.Schema
let String = Schema.Types.String

export const ServiceSchema = new Schema(
  {
    name: String,
    price: Number,
    description: String,
    image: String,
  },
  {
    collection: 'services',
  },
)
