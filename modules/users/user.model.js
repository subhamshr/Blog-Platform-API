const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: { type: String, required: true, select: false }, // select : false indicates when select operation, password is not returned
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
