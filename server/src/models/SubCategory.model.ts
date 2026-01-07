import mongoose, { Schema, Document } from "mongoose";

export interface ISubcategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  image: string;
  status: boolean;
}

const subcategorySchema: Schema<ISubcategory> = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Subcategory = mongoose.model<ISubcategory>(
  "Subcategory",
  subcategorySchema
);

export default Subcategory;
