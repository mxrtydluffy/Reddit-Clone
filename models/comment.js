const { Schema, model } = require("mongoose");
const Populate = require("../util/autopopulate");

const commentSchema = new Schema(
    {
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }, 
    { timestamps: true }
);

// AUHTOR FIELD
commentSchema
    .pre("findOne", Populate("author"))
    .pre("find", Populate("author"))
    .pre("find", Populate("comments"))
    .pre("findOne", Populate("comments"));

module.exports = model('Comment', commentSchema);