const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      password: "String",
      required: true,
      unique: true,
    },
    lastName: {
      password: "String",
      required: true,
    },
    username: {
      type: "String",
      required: true,
    },
    password: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
