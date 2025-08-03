const router = require("express").Router();
const blogController = require("./blog.controller");
const { secureMiddleWare, isOwnerOfBlog } = require("../../utils/secure");

router.post(
  "/",
  secureMiddleWare(),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.coverImage = req.file.path;
      }
      req.body.createdBy = req.currentUser;
      const result = await blogController.create(req.body);
      res.json({ msg: "Created new blog", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
    "/my-blogs", 
    secureMiddleWare(),
    async (req, res, next) => {
    try {
    const { page, limit, title } = req.query;
    const search = title ? { title: new RegExp(title, "i") } : {};
    const result = await blogController.list({ page, limit, search , authorId: req.currentUser });
    res.json({ msg: "All blogs", data: result });
    } catch (e) {
    next(e);
}
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await blogController.getByid(req.params.id);
    if (!result) {
      return res.status(404).json({ msg: "Blog not found" });
    }
    res.json({ msg: `Blog ID: ${req.params.id}`, data: result });
  } catch (e) {
    next(e);
  }
});


router.patch(
  "/:id",
      secureMiddleWare(),
      isOwnerOfBlog(),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.coverImage = req.file.path;
      }
      req.body.updatedBy = req.currentUser;
      const result = await blogController.update(req.params.id, req.body);
      res.json({ msg: "Blog updated successfully", data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.delete("/:id", 
    secureMiddleWare(), 
    isOwnerOfBlog(),
    async (req, res, next) => {
  try {
    const result = await blogController.remove(req.params.id);
    res.json({ msg: "Blog deleted successfully", data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/:id/comments", secureMiddleWare(), async (req, res, next) => {
  try {
    const commentPayload = {
      text: req.body.text,
      commentedBy: req.currentUser,
    };
    const result = await blogController.addComment(req.params.id, commentPayload);
    res.json({ msg: "Comment added", data: result });
  } catch (e) {
    next(e);
  }
});

router.delete("/:id/comments/:commentId", secureMiddleWare(), async (req, res, next) => {
  try {
    const result = await blogController.deleteComment(req.params.id, req.params.commentId);
    res.json({ msg: "Comment deleted", data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;