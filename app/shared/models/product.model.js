import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    currency: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.method("toJSON", function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, ...object } = this.toObject();
  const newObject = {
    ...object,
  };

  return newObject;
});

export const ProductModel = mongoose.model("product", schema);
