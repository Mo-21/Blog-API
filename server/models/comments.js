const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: {
    type: "String",
    required: true,
  },
  content: {
    type: "String",
    required: true,
  },
  creationDate: {
    type: "Date",
    required: true,
    default: Date.now(),
  },
});

commentSchema.virtual("time_formatted").get(function () {
  return DateTime.fromJSDate(this.creationDate).toLocaleString({
    ...DateTime.DATE_MED,
    ...DateTime.TIME_SIMPLE,
  });
});

module.exports = mongoose.model("Comment", commentSchema);
