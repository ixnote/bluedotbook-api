import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    items: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cart",
      },
    ],
    total: {
      type: String,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
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

export const OrderModel = mongoose.model("order", schema);
