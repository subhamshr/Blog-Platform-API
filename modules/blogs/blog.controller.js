const Blog = require("./blog.model");

const create = async (payload) => {
  const blog = new Blog(payload);
  return await blog.save();
};

const list = async ({ page = 1, limit = 10, title, authorId }) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const search = {};
  if (title) {
    search.title = new RegExp(title, "i");
  }
  if (authorId) {
    search.author = authorId;
  }
  const blogs = await Blog.find(search)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));
  const count = await Blog.countDocuments(search);
  return { blogs, total: count };
};


const getByid = async (id) => {
  return await Blog.findOne({ id }).populate("author", "name image");
};

const update = async (id, payload) => {
  return await Blog.findOneAndUpdate({ id }, payload, { new: true });
};

const remove = async (id) => {
  return await Blog.findOneAndDelete({ id });
};

const addComment = async (blogId, commentPayload) => {
  const blog = await Blog.findOne({ id: blogId });
  if (!blog) throw new Error("Blog not found");
  blog.comments.push(commentPayload);
  await blog.save();
  return blog;
};

const deleteComment = async (blogId, commentId) => {
  const blog = await Blog.findOne({ id: blogId });
  if (!blog) throw new Error("Blog not found");
  blog.comments = blog.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );
  await blog.save();
  return blog;
};

module.exports = {
  create,
  list,
  getByid,
  update,
  remove,
  addComment,
  deleteComment
}