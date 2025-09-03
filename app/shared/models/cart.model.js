import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },

    product: {
      type: mongoose.Schema.ObjectId,
      ref: "product",
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "processed", "completed"],
      default: "pending",
    },
    total: {
      type: Number,
    },
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

export const CartModel = mongoose.model("cart", schema);
