import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  status: boolean;
}

const categorySchema: Schema<ICategory> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
