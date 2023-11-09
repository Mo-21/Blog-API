const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: "String",
      required: true,
      unique: true,
    },
    content: {
      type: "String",
      required: true,
    },
    author: {
      username: { type: "String", required: true },
      id: { type: Schema.Types.ObjectId, ref: "User", require: true },
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

postSchema.virtual("creation_time_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString({
    ...DateTime.DATE_MED,
    ...DateTime.TIME_SIMPLE,
  });
});

postSchema.virtual("updatedAt_time_formatted").get(function () {
  return DateTime.fromJSDate(this.updatedAt).toLocaleString({
    ...DateTime.DATE_MED,
    ...DateTime.TIME_SIMPLE,
  });
});

module.exports = mongoose.model("Post", postSchema);
