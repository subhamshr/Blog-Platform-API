const { Schema, model } = require("mongoose");

const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    id: { type: String, unique: true, required: true },
    content: { type: String, required: true },
    tags: [{ type: String }],
    author: { type: ObjectId, ref: "User", required: true },
    createdBy: { type: ObjectId, ref: "User" },
    updatedBy: { type: ObjectId, ref: "User" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    comments: [
      {
        text: { type: String, required: true },
        commentedBy: { type: ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
