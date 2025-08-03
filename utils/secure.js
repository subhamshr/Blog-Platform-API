const userModel = require("../modules/users/user.model");
const Blog = require("../modules/blogs/blog.model");
const { verifyToken } = require("./token");

const secureMiddleWare = () => {
  return async (req, res, next) => {
    try {
      const { token } = req.headers;
      if (!token) throw new Error("Token is missing");
      const isValid = verifyToken(token);
      if (!isValid) throw new Error("Token expired");
      const { data } = isValid;
      const userInfo = await userModel.findOne({
        email: data?.email,
      });
      if (!userInfo) throw new Error("user not found");
      req.currentUser = userInfo?._id;
      next();
    } catch (e) {
      next(e);
    }
  };
};

const isOwnerOfBlog = () => {
  return async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ id: req.params.id });
    if (!blog) throw new Error("Blog not found");
    
    const userId = req.currentUser.toString();
    const authorId = blog.author.toString();

    if (userId !== authorId) throw new Error("Forbidden: Not your blog");

    next();
  } catch (e) {
    next(e);
  }
}
};

module.exports = {
  secureMiddleWare,
  isOwnerOfBlog
};

