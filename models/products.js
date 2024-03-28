import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    url_product: {
      type: String,
      require: true
    },
    url_thumbnail: {
      type: String,
      require: true
    },
    categories: [
      {
        slug: String,
        title: String
      }
    ],
    attributes: [
      {
        id: Number,
        name: String,
        value: String,
      }
    ]
  },
  { timestamps: true }
);

productSchema.index({ name: "text" });
productSchema.plugin(paginate);
const Product = mongoose.model("Product", productSchema);
export default Product;
