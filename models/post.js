const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  summary: { type: String, required: true },
  subreddit: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  author: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  downVotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  upVotes: [{ type: Schema.Types.ObjectId, ref: "User"}],
  voteScore: { type: Number }
});

// AUTHOR FIELD
postSchema.pre("findOne", Populate("author")).pre("find", Populate("author"));

module.exports = model("Post", postSchema);