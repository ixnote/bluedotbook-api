import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    fullname: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

schema.method("toJSON", function () {
  const { __v, password, resetPasswordToken, resetPasswordExpires, ...object } =
    this.toObject();
  const newObject = {
    __v,
    id: this._id,
    ...object,
  };
  return newObject;
});

export const UserModel = mongoose.model("user", schema);
