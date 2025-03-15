import mongoose from "mongoose";
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const CategorySchema = new Schema(
  {
    name: String,
    price: Number,
    description: String
  },
  {
    collection: "categories",
  }
);