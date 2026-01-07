import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
  subcategory: mongoose.Types.ObjectId;
  image: string;
  status: boolean;
}

const productSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: "Subcategory",
      required: true,
    },
    image: { type: String, required: true },
    status: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
